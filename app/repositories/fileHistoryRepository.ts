import CreateFileHistoryPayload from "#interfaces/fileHistory/createFileHistoryPayload";
import UpdateFileHistoryPayload from "#interfaces/fileHistory/updateFileHistoryPayload";
import FileHistory from "#models/fileHistory/fileHistory";
import FileHistoryRepositoryInterface from "#repositoriesInterface/fileHistoryRepositoryInterface";

export default class FileHistoryRepository implements FileHistoryRepositoryInterface {
  async getAllHistory(): Promise<FileHistory[]> {
    return await FileHistory.all();
  }

  async getById(historyId: number): Promise<FileHistory> {
    return await FileHistory.findOrFail(historyId);
  }

  async getByUserId(userId: number): Promise<FileHistory[]> {
    return FileHistory.findManyBy("user_id", userId);
  }

  async createHistory(historyPayload: CreateFileHistoryPayload): Promise<FileHistory> {
    return FileHistory.create(historyPayload);
  }

  async updateHistory(historyPayload: UpdateFileHistoryPayload): Promise<FileHistory> {
    return FileHistory.updateOrCreate({ id: historyPayload.id }, historyPayload);
  }
}