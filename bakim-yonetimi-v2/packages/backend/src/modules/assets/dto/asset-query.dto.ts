export interface AssetQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetTypeId?: number;
  assetStatusId?: number;
  locationId?: number;
  departmentId?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
