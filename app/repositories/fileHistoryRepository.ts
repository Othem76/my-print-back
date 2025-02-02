import CreateFileHistoryPayload from "#interfaces/fileHistory/createFileHistoryPayload";
import UpdateFileHistoryPayload from "#interfaces/fileHistory/updateFileHistoryPayload";
import FileHistory from "#models/fileHistory/fileHistory";
import FileHistoryRepositoryInterface from "#repositoriesInterface/fileHistoryRepositoryInterface";

export default class FileHistoryRepository implements FileHistoryRepositoryInterface {
  async getAllHistory(): Promise<FileHistory[]> {
    return await FileHistory.all();
  }

  async getById(historyId: string): Promise<FileHistory> {
    return await FileHistory.findOrFail(historyId);
  }

  async getByFileServerName(fileServerName: string): Promise<FileHistory | null> {
    return FileHistory.findBy("file_server_name", fileServerName);
  }

  async getByUserId(userId: string): Promise<FileHistory[]> {
    return FileHistory.findManyBy("user_id", userId);
  }

  async createHistory(historyPayload: CreateFileHistoryPayload): Promise<FileHistory> {
    return FileHistory.create(historyPayload);
  }

  async updateHistory(historyPayload: UpdateFileHistoryPayload): Promise<FileHistory> {
    return FileHistory.updateOrCreate({ id: historyPayload.id }, { status: historyPayload.status });
  }

  async deleteHistoryByUserId(userId: string): Promise<void> {
    await FileHistory.query().where("user_id", userId).delete();
  }
}
