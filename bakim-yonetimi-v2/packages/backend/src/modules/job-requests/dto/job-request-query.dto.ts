import { JobRequestStatus, PriorityLevel } from '@prisma/client';

export interface JobRequestQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: JobRequestStatus;
  priority?: PriorityLevel;
  departmentId?: number;
  locationId?: number;
  assignedToId?: number;
  requestedById?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}