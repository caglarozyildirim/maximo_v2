import { JobRequestStatus, PriorityLevel } from '@prisma/client';

export interface UpdateJobRequestDto {
  title?: string;
  description?: string;
  status?: JobRequestStatus;
  priority?: PriorityLevel;
  departmentId?: number;
  locationId?: number;
  assetId?: number;
  costCenterId?: number;
  assignedToId?: number;
  expectedStartDate?: string;
  expectedEndDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedCost?: number;
  actualCost?: number;
  rejectionReason?: string;
  completionNotes?: string;
  notes?: string;
}