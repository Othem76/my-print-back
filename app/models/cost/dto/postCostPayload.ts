export type PostCostPayload = Partial<PrintSetting> & { filename: string }

export interface PrintSetting {
  printer: string,
  material: string,
  support: boolean,
  density: number
}

export type Cost = {
  materialCost: number,
  cleaningCost: number,
  electricityCost: number,
  totalCost: number
}
