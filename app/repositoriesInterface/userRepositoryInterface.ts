import CreateUserPayload from "#interfaces/user/createUserPayload.js";
import UpdateUserPayload from "#interfaces/user/updateUserPayload.js";
import User from "#models/user/user";

export default interface UserRepositoryInterface {
  getAllUsers(): Promise<User[]>;

  getUserById(userId: number): Promise<User>;

  getUserByEmail(email: string): Promise<User | null>;

  createUser(user: CreateUserPayload): Promise<User>;

  updateUser(userId: number, payload: UpdateUserPayload): Promise<User>;

  deleteUser(userId: number): Promise<void>;
}
