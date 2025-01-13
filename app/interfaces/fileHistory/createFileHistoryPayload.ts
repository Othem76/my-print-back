import { HistoryStatus } from "./historyStatus.js";

export default interface CreateFileHistoryPayload {
  fileOriginalName: string;
  fileServerName: string;
  user_id: number;
  status?: HistoryStatus;
}