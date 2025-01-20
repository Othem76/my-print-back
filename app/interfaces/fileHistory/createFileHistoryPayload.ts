import { HistoryStatus } from "./historyStatus.js";

export default interface CreateFileHistoryPayload {
  fileOriginalName: string;
  fileServerName: string;
  userId: number;
  status?: HistoryStatus;
}