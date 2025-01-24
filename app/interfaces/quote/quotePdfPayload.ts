export default interface QuotePdfPayload {
  fileServerName: string
  title: string
  description: string
  date: string
  printer: string
  material: string
  quantity: number
  materialCost: number
  printingTime: number
  costPerHour: number
  cleaningCost: number
  totalCost: number
}
