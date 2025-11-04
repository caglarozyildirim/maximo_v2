export interface AssignmentQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  assignedToUserId?: number;
  isActive?: boolean;
  assignmentTypeId?: number;
  departmentId?: number;
  locationId?: number;
}
