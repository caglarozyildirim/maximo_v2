// User & Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department?: string;
  phone?: string;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
  module: string;
  action: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Job Request Types
export enum JobRequestStatus {
  NEW = 'NEW',
  MANAGER_APPROVAL = 'MANAGER_APPROVAL',
  SL_ENGINEER_TAKEOVER = 'SL_ENGINEER_TAKEOVER',
  TECHNICAL_APPROVAL = 'TECHNICAL_APPROVAL',
  COST_CALCULATION = 'COST_CALCULATION',
  BUSINESS_COST_APPROVAL = 'BUSINESS_COST_APPROVAL',
  SOLUTION_ASSIGNMENT = 'SOLUTION_ASSIGNMENT',
  IMPLEMENTATION = 'IMPLEMENTATION',
  SOLUTION_APPROVAL = 'SOLUTION_APPROVAL',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface JobRequest {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  priority: Priority;
  status: JobRequestStatus;
  currentStep?: string;
  department: string;
  location?: string;
  costEstimate?: number;
  requestedBy: User;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  dueDate?: string;
  approvals?: Approval[];
  workflowHistory?: WorkflowHistory[];
  comments?: Comment[];
}

export interface Approval {
  id: string;
  stepName: string;
  stepNumber: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approver: User;
  comment?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface WorkflowHistory {
  id: string;
  stepName: string;
  stepNumber?: number;
  action: string;
  fromStatus?: string;
  toStatus?: string;
  comment?: string;
  actor: User;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface JobRequestFormData {
  title: string;
  description: string;
  department: string;
  priority: Priority;
  location?: string;
}

// Re-export all types to ensure they're available
export type {
  User,
  Role,
  Permission,
  AuthState,
  JobRequest,
  Approval,
  WorkflowHistory,
  Comment,
  ApiResponse,
  PaginatedResponse,
  LoginFormData,
};
