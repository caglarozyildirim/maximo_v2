export interface CreateIncidentDto {
  assetId: number;
  incidentTypeId: number;
  title: string;
  description: string;
  incidentDate: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  reportedByUserId: number;
  locationId?: number;
  immediateAction?: string;
}
