export interface CreateAssetDto {
  assetName: string;
  description?: string;
  assetTypeId: number;
  assetStatusId: number;
  assetClassId?: number;
  assetGroupHeaderId?: number;
  locationId?: number;
  costCenterId?: number;
  departmentId?: number;
  purchasePrice?: number;
  currentValue?: number;
  purchaseDate?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  specifications?: string;
  notes?: string;
}
