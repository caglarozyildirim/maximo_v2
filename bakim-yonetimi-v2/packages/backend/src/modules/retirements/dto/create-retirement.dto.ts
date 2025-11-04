export interface CreateRetirementDto {
  assetId: number;
  reason: string;
  retirementDate: string;
  estimatedValue?: number;
  notes?: string;
}
