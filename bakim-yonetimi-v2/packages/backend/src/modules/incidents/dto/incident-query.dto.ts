export interface IncidentQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  incidentTypeId?: number;
  statusId?: number;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  reportedByUserId?: number;
  assignedToUserId?: number;
  startDate?: string;
  endDate?: string;
}
