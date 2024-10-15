import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UserService from "#services/userService";

@inject()
export default class GetUserByIdController {
  constructor(private userService: UserService) {}

  async handle({ params, response }: HttpContext) {
    const userId = params.id;

    if (!userId) {
      return response.status(400).send({ error: "User ID is required" });
    }

    try {
      const user = await this.userService.getUserById(userId);
      return response.send(user.toJSON());
    } catch (error) {
      return response.status(404).send({ error: "User not found" });
    }
  }
}
