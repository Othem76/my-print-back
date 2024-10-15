import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UserService from "#services/userService";
import CreateUserPayload from "#models/user/createUserPayload";

@inject()
export default class CreateUserController {
  constructor(private userService: UserService) {}

  async handle({ request, response }: HttpContext) {
    const payload: CreateUserPayload = request.only([
      "fullName",
      "email",
      "password",
    ]);

    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return response.badRequest({ message: "Invalid email format" });
    }

    if (!payload.password || payload.password.length < 8) {
      return response.badRequest({
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await this.userService.createUser(payload);
    return response.created(user);
  }
}
