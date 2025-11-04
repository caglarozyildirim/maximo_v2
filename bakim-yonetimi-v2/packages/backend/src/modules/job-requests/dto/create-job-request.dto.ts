import { JobRequestStatus, PriorityLevel } from '@prisma/client';

export interface CreateJobRequestDto {
  title: string;
  description?: string;
  priority?: PriorityLevel;
  departmentId?: number;
  locationId?: number;
  assetId?: number;
  costCenterId?: number;
  expectedStartDate?: string;
  expectedEndDate?: string;
  estimatedCost?: number;
  notes?: string;
}

// Basit doğrulama fonksiyonu
export function validateCreateJobRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push('Title is required');
  }

  if (data.priority && !Object.values(PriorityLevel).includes(data.priority)) {
    errors.push('Invalid priority level');
  }

  if (data.departmentId && typeof data.departmentId !== 'number') {
    errors.push('Department ID must be a number');
  }

  if (data.estimatedCost && (typeof data.estimatedCost !== 'number' || data.estimatedCost < 0)) {
    errors.push('Estimated cost must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}