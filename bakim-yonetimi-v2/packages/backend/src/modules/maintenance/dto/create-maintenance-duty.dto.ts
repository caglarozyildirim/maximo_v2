export interface CreateMaintenanceDutyDto {
  assetId: number;
  maintenanceTypeId: number;
  description: string;
  plannedStartDate: string;
  plannedEndDate: string;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost?: number;
  notes?: string;
}
