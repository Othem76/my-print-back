export default interface QuotePdfPayload {
  fileServerName: string
  printer: string
  material: string
  totalMaterialCost: number
  printTime: number
  electricityCost: number
  cleaningCost: number
  totalCost: number
}
