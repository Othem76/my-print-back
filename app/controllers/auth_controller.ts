import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  /**
   * @register
   * @description Register a new user
   * @responseBody 201 - { "fullName": "John","email": "john@test.com","createdAt": "2025-01-08T22:16:12.168+00:00","updatedAt": "2025-01-08T22:16:12.169+00:00","id": 3 }
   * @responseBody 422 - {"errors":[{"message":"The email has already been taken","rule":"database.unique","field":"email"},{"message":"The password field must have at least 5 characters","rule":"minLength","field":"password","meta":{"min":5}}]}
   * @requestBody { "fullName": "John", "email": "john@test.com", "name": "John", "password": "123456789" }
  */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const { default: User } = await import('#models/user/user')
    const user = await User.create(payload)

    return response.created(user)
  }

  /**
   * @login
   * @description Login a user
   * @responseBody 200 - { "token" : { "type" : "bearer" , "name" : "null" , "token" : "oat_Mg.MXROdmlmWHpwTTVBMmtaZGdTQXVaaFBlYld5eERMT3RiUjZOUDI4XzI0MzI1ODgyODU" , "abilities" : ["*"] , "lastUsedAt" : "null", "expiresAt" : "null" }, "id" : 3, "fullName" : "John", "email" : "john@test.com", "createdAt" : "2025-01-08T22:16:12.168+00:00", "updatedAt" : "2025-01-08T22:16:12.169+00:00" }
   * @responseBody 400 - {"errors":[{"message":"Invalid user credentials"}]}
   * @requestBody { "email": "john@test.com", "password": "123456789" }
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const { default: User } = await import('#models/user/user')
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  /**
   * @logout
   * @description Logout a user
   * @responseBody 200 - { "message": "Logged out" }
   * @responseBody 400 - { "message": "Token not found" }
  */
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }

    const { default: User } = await import('#models/user/user')
    await User.accessTokens.delete(user, token)

    return response.ok({ message: 'Logged out' })
  }
}