import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UserService from "#services/userService";

@inject()
export default class GetAllUsersController {
  constructor(private userService: UserService) {}

  async handle({ response }: HttpContext) {
    try {
      const users = await this.userService.getAllUsers();
      const usersJson = users.map((user) => user.toJSON());

      return response.send(usersJson);
    } catch (error) {
      return response.status(404).send({ error: "Users not found" });
    }
  }
}
