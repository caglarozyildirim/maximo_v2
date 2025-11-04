export interface RetirementQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  statusId?: number;
  startDate?: string;
  endDate?: string;
}
