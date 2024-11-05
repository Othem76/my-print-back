export type PostCostPayload = Partial<PrintSetting> & { filename: string };

export interface PrintSetting {
  printer: string;
  material: string;
  support: boolean;
  layerHeight: number;
  infill: number;
}

export type Cost = {
  materialCost: number;
  cleaningCost: number;
  electricityCost: number;
  totalCost: number;
  printTime: string;
};
