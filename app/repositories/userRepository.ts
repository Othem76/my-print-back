import CreateUserPayload from "#interfaces/user/createUserPayload.js";
import UpdateUserPayload from "#interfaces/user/updateUserPayload.js";
import User from "#models/user/user";
import UserRepositoryInterface from "#repositoriesInterface/userRepositoryInterface";

export default class UserRepository implements UserRepositoryInterface {
  async getAllUsers(): Promise<User[]> {
    return await User.all();
  }
  async getUserById(userId: string): Promise<User> {
    return await User.findOrFail(userId);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await User.findBy("email", email);
  }
  async createUser(payload: CreateUserPayload): Promise<User> {
    const user = await User.create(payload);
    return user;
  }
  async updateUser(userId: string, payload: UpdateUserPayload): Promise<User> {
    const userModified = await User.updateOrCreate({ id: userId }, payload);
    return userModified;
  }
  async deleteUser(userId: string): Promise<void> {
    await User.query().where("id", userId).delete();
  }
}
