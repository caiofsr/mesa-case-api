import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Mediators/Client/Auth/Store'
import Login from 'App/Mediators/Client/Auth/Login'
import Logout from 'App/Mediators/Client/Auth/Logout'

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const { status, data } = await Store(
      request.only(['firstName', 'lastName', 'email', 'password'])
    )
    return response.status(status).send(data)
  }

  public async signIn({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Login(request.only(['email', 'password']), auth)
    return response.status(status).send(data)
  }

  public async logout({ response, auth }: HttpContextContract) {
    const { status } = await Logout(auth)
    return response.status(status)
  }
}
