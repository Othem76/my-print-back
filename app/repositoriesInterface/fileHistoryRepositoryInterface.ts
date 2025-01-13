import CreateFileHistoryPayload from "#interfaces/fileHistory/createFileHistoryPayload";
import UpdateFileHistoryPayload from "#interfaces/fileHistory/updateFileHistoryPayload";
import FileHistory from "#models/fileHistory/fileHistory"

export default interface FileHistoryRepositoryInterface {
  getAllHistory(): Promise<FileHistory[]>;

  getById(historyId: number): Promise<FileHistory>;

  getByUserId(userId: number): Promise<FileHistory[]>

  createHistory(historyPayload: CreateFileHistoryPayload): Promise<FileHistory>

  updateHistory(historyPayload: UpdateFileHistoryPayload): Promise<FileHistory>
}