import Material from "#models/material/material"
import Printer from "#models/printer/printer"

export default interface QuotePdfPayload {
  filename?: string
  printerId: string
  materialId: string
  totalMaterialCost: number
  printTime: string
  electricityCost: number
  cleaningCost: number
  totalCost: number
  material: Material
  printer: Printer
}
