export interface MaintenanceDutyQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  maintenanceTypeId?: number;
  statusId?: number;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  startDate?: string;
  endDate?: string;
}
