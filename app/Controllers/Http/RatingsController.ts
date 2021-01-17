import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Show from 'App/Mediators/Client/Ratings/Show'
import Store from 'App/Mediators/Client/Ratings/Store'

interface ShowQueryParams {
  page: string
}

export default class RatingsController {
  public async show({ request, response }: HttpContextContract) {
    const { status, data } = await Show(request.param('id'), request.get() as ShowQueryParams)
    return response.status(status).send(data)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Store(
      request.only(['comment', 'rate']),
      request.param('id'),
      auth
    )
    return response.status(status).send(data)
  }
}
