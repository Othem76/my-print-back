export default interface QuotePdfPayload {
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
