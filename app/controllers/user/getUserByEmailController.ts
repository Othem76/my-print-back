import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UserService from "#services/userService";

@inject()
export default class GetUserByEmailController {
  constructor(private userService: UserService) {}

  async handle({ request, response }: HttpContext) {
    const userEmail = request.qs().email;

    if (!userEmail) {
      return response.status(400).send({ error: "User email is required" });
    }

    try {
      const user = await this.userService.getUserByEmail(userEmail);
      if (!user) {
        return response.status(404).send({ error: "User not found" });
      }
      return response.send(user.toJSON());
    } catch (error) {
      return response.status(404).send({ error: "User not found" });
    }
  }
}
