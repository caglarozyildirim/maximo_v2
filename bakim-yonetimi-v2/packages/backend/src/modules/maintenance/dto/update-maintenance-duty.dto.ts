export interface UpdateMaintenanceDutyDto {
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  statusId?: number;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
}
