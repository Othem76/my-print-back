import { PrintSetting } from "../../interfaces/cost/printSettings.js";

export type PostCostPayload = Partial<PrintSetting> & { filename: string };
