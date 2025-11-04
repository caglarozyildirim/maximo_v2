export interface CreateCostCenterChangeDto {
  assetId: number;
  fromCostCenterId: number;
  toCostCenterId: number;
  changeDate: string;
  reason: string;
  notes?: string;
}
