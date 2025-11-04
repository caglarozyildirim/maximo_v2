export interface CostCenterChangeQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  statusId?: number;
  fromCostCenterId?: number;
  toCostCenterId?: number;
}
