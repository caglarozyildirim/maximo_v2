export interface CreateAssignmentDto {
  assetId: number;
  assignedToUserId: number;
  assignmentDate: string;
  notes?: string;
  assignmentTypeId?: number;
  departmentId?: number;
  locationId?: number;
}
