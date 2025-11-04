export interface UpdateIncidentDto {
  title?: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  statusId?: number;
  assignedToUserId?: number;
  immediateAction?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  resolvedDate?: string;
}
