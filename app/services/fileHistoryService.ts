import CreateFileHistoryPayload from "#interfaces/fileHistory/createFileHistoryPayload";
import { HistoryStatus } from "#interfaces/fileHistory/historyStatus";
import UpdateFileHistoryPayload from "#interfaces/fileHistory/updateFileHistoryPayload";
import FileHistory from "#models/fileHistory/fileHistory";
import FileHistoryRepository from "#repositories/fileHistoryRepository";
import { inject } from "@adonisjs/core";

@inject()
export default class FileHistoryService {
  constructor(private readonly repository: FileHistoryRepository) {}

  async getAllHistory(): Promise<FileHistory[]> {
    return await this.repository.getAllHistory();
  }

  async getById(historyId: number): Promise<FileHistory> {
    return await this.repository.getById(historyId);
  }

  async getByFileServerName(fileServerName: string): Promise<FileHistory | null> {
    return await this.repository.getByFileServerName(fileServerName);
  }

  async getByUserId(userId: number): Promise<FileHistory[]> {
    return await this.repository.getByUserId(userId);
  }

  async createHistory(historyPayload: CreateFileHistoryPayload): Promise<FileHistory> {
    historyPayload.status = HistoryStatus.Pending;
    return await this.repository.createHistory(historyPayload);
  }

  async updateHistory(historyPayload: UpdateFileHistoryPayload): Promise<FileHistory> {
    return await this.repository.updateHistory(historyPayload);
  }
}