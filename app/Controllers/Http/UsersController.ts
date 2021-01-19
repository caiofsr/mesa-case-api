import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Show from 'App/Mediators/Client/Users/Show'
import Update from 'App/Mediators/Client/Users/Update'

export default class RatingsController {
  public async show({ request, response }: HttpContextContract) {
    const { status, data } = await Show(request.param('id'))
    return response.status(status).send(data)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Update(
      request.only(['firstName', 'lastName', 'email', 'oldPassword', 'newPassword']),
      request.param('id'),
      auth
    )
    return response.status(status).send(data)
  }
}
