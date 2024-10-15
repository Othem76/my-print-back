import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UserService from "#services/userService";
import UpdateUserPayload from "#models/user/updateUserPayload";

@inject()
export default class UpdateUserController {
  constructor(private userService: UserService) {}

  async handle({ request, response }: HttpContext) {
    const { id, fullName, email } = request.only(["id", "fullName", "email"]);

    if (!id || isNaN(Number(id))) {
      return response.badRequest({
        message: "User ID is required and must be a number",
      });
    }

    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return response.badRequest({ message: "Invalid email format" });
      }
    }

    const payload: UpdateUserPayload = {};
    if (fullName) payload.fullName = fullName;
    if (email) payload.email = email;

    try {
      const user = await this.userService.updateUser(id, payload);
      return response.created(user);
    } catch (error) {
      return response.internalServerError({
        message: "Failed to update user",
        error,
      });
    }
  }
}
