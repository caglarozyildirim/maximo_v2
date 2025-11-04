import prisma from '../../database/prisma';
import { JobRequestStatus } from '@prisma/client';
import { AppError } from '../../common/middleware/error.middleware';

export interface WorkflowConfig {
  name: string;
  module: string;
  steps: WorkflowStepConfig[];
}

export interface WorkflowStepConfig {
  stepNumber: number;
  name: string;
  displayName: string;
  type: 'APPROVAL' | 'TASK' | 'NOTIFICATION';
  assigneeRole?: string;
  nextStepOnApprove?: string;
  nextStepOnReject?: string;
}

export class WorkflowEngine {
  // İş Talebi Workflow Configuration
  static JOB_REQUEST_WORKFLOW: WorkflowConfig = {
    name: 'job_request_workflow',
    module: 'job_request',
    steps: [
      {
        stepNumber: 1,
        name: 'NEW',
        displayName: 'Yeni Talep',
        type: 'TASK',
        nextStepOnApprove: 'MANAGER_APPROVAL',
      },
      {
        stepNumber: 2,
        name: 'MANAGER_APPROVAL',
        displayName: 'Yönetici Onayı',
        type: 'APPROVAL',
        assigneeRole: 'MANAGER',
        nextStepOnApprove: 'SL_ENGINEER_TAKEOVER',
        nextStepOnReject: 'REJECTED',
      },
      {
        stepNumber: 3,
        name: 'SL_ENGINEER_TAKEOVER',
        displayName: 'Mühendis Devraldı',
        type: 'TASK',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'TECHNICAL_APPROVAL',
      },
      {
        stepNumber: 4,
        name: 'TECHNICAL_APPROVAL',
        displayName: 'Teknik Onay',
        type: 'APPROVAL',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'COST_CALCULATION',
        nextStepOnReject: 'REJECTED',
      },
      {
        stepNumber: 5,
        name: 'COST_CALCULATION',
        displayName: 'Maliyet Hesaplama',
        type: 'TASK',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'BUSINESS_COST_APPROVAL',
      },
      {
        stepNumber: 6,
        name: 'BUSINESS_COST_APPROVAL',
        displayName: 'İş Yöneticisi Maliyet Onayı',
        type: 'APPROVAL',
        assigneeRole: 'BUSINESS_MANAGER',
        nextStepOnApprove: 'SOLUTION_ASSIGNMENT',
        nextStepOnReject: 'REJECTED',
      },
      {
        stepNumber: 7,
        name: 'SOLUTION_ASSIGNMENT',
        displayName: 'Çözüm Sorumlusu Atama',
        type: 'TASK',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'IMPLEMENTATION',
      },
      {
        stepNumber: 8,
        name: 'IMPLEMENTATION',
        displayName: 'Uygulama',
        type: 'TASK',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'SOLUTION_APPROVAL',
      },
      {
        stepNumber: 9,
        name: 'SOLUTION_APPROVAL',
        displayName: 'Çözüm Onayı',
        type: 'APPROVAL',
        assigneeRole: 'ENGINEER',
        nextStepOnApprove: 'DONE',
        nextStepOnReject: 'IMPLEMENTATION',
      },
      {
        stepNumber: 10,
        name: 'DONE',
        displayName: 'Tamamlandı',
        type: 'NOTIFICATION',
      },
      {
        stepNumber: 11,
        name: 'REJECTED',
        displayName: 'Reddedildi',
        type: 'NOTIFICATION',
      },
      {
        stepNumber: 12,
        name: 'CANCELLED',
        displayName: 'İptal Edildi',
        type: 'NOTIFICATION',
      },
    ],
  };

  async initializeWorkflows() {
    // Check if workflow already exists
    const existing = await prisma.workflowDefinition.findUnique({
      where: { name: WorkflowEngine.JOB_REQUEST_WORKFLOW.name },
    });

    if (existing) {
      console.log('Workflow already initialized');
      return;
    }

    // Create workflow definition
    await prisma.workflowDefinition.create({
      data: {
        name: WorkflowEngine.JOB_REQUEST_WORKFLOW.name,
        module: WorkflowEngine.JOB_REQUEST_WORKFLOW.module,
        config: WorkflowEngine.JOB_REQUEST_WORKFLOW as any,
        steps: {
          create: WorkflowEngine.JOB_REQUEST_WORKFLOW.steps.map((step) => ({
            stepNumber: step.stepNumber,
            name: step.name,
            displayName: step.displayName,
            type: step.type,
            assigneeRole: step.assigneeRole,
            nextStepOnApprove: step.nextStepOnApprove,
            nextStepOnReject: step.nextStepOnReject,
          })),
        },
      },
    });

    console.log('Workflow initialized successfully');
  }

  async transitionToNextStep(
    entityType: string,
    entityId: string,
    currentStatus: string,
    action: 'approve' | 'reject' | 'complete' | 'cancel',
    actorId: string,
    comment?: string
  ): Promise<string> {
    // Get workflow steps
    const workflow = WorkflowEngine.JOB_REQUEST_WORKFLOW;
    const currentStep = workflow.steps.find((s) => s.name === currentStatus);

    if (!currentStep) {
      throw new AppError(400, 'Invalid current status');
    }

    let nextStatus: string;

    // Determine next status
    if (action === 'cancel') {
      nextStatus = 'CANCELLED';
    } else if (action === 'approve' && currentStep.nextStepOnApprove) {
      nextStatus = currentStep.nextStepOnApprove;
    } else if (action === 'reject' && currentStep.nextStepOnReject) {
      nextStatus = currentStep.nextStepOnReject;
    } else if (action === 'complete' && currentStep.nextStepOnApprove) {
      nextStatus = currentStep.nextStepOnApprove;
    } else {
      throw new AppError(400, 'Invalid action for current step');
    }

    // Record workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType,
        entityId,
        jobRequestId: entityType === 'job_request' ? entityId : undefined,
        stepName: currentStep.name,
        stepNumber: currentStep.stepNumber,
        action,
        fromStatus: currentStatus,
        toStatus: nextStatus,
        comment,
        actorId,
      },
    });

    return nextStatus;
  }

  async createApproval(
    jobRequestId: string,
    stepName: string,
    stepNumber: number,
    approverId: string
  ) {
    return await prisma.approval.create({
      data: {
        jobRequestId,
        stepName,
        stepNumber,
        approverId,
        status: 'PENDING',
      },
    });
  }

  async processApproval(
    approvalId: string,
    action: 'approve' | 'reject',
    approverId: string,
    comment?: string
  ) {
    const approval = await prisma.approval.findUnique({
      where: { id: approvalId },
      include: { jobRequest: true },
    });

    if (!approval) {
      throw new AppError(404, 'Approval not found');
    }

    if (approval.approverId !== approverId) {
      throw new AppError(403, 'Not authorized to process this approval');
    }

    if (approval.status !== 'PENDING') {
      throw new AppError(400, 'Approval already processed');
    }

    // Update approval
    await prisma.approval.update({
      where: { id: approvalId },
      data: {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        comment,
        approvedAt: new Date(),
      },
    });

    // Transition job request to next status
    if (approval.jobRequest) {
      const nextStatus = await this.transitionToNextStep(
        'job_request',
        approval.jobRequest.id,
        approval.jobRequest.status,
        action,
        approverId,
        comment
      );

      await prisma.jobRequest.update({
        where: { id: approval.jobRequest.id },
        data: {
          status: nextStatus as JobRequestStatus,
          currentStep: nextStatus,
          ...(nextStatus === 'DONE' && { completedAt: new Date() }),
        },
      });
    }

    return approval;
  }

  async getWorkflowHistory(entityType: string, entityId: string) {
    return await prisma.workflowHistory.findMany({
      where: {
        entityType,
        entityId,
      },
      include: {
        actor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
