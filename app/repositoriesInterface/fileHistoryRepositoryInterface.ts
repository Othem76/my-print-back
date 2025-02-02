import CreateFileHistoryPayload from "#interfaces/fileHistory/createFileHistoryPayload";
import UpdateFileHistoryPayload from "#interfaces/fileHistory/updateFileHistoryPayload";
import FileHistory from "#models/fileHistory/fileHistory"

export default interface FileHistoryRepositoryInterface {
  getAllHistory(): Promise<FileHistory[]>;

  getById(historyId: string): Promise<FileHistory>;

  getByFileServerName(fileServerName: string): Promise<FileHistory | null>;

  getByUserId(userId: string): Promise<FileHistory[]>

  createHistory(historyPayload: CreateFileHistoryPayload): Promise<FileHistory>

  updateHistory(historyPayload: UpdateFileHistoryPayload): Promise<FileHistory>

  deleteHistoryByUserId(userId: string): Promise<void>
}
