import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Store from 'App/Mediators/Client/Spots/Store'
import Show from 'App/Mediators/Client/Spots/Show'
import Index from 'App/Mediators/Client/Spots/Index'
import Update from 'App/Mediators/Client/Spots/Update'
import Delete from 'App/Mediators/Client/Spots/Delete'

interface IndexQueryParams {
  own: string
  list: string
  distance: string
  page: string
  latitude: string
  longitude: string
}

export default class SpotsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Index(request.get() as IndexQueryParams, auth)
    return response.status(status).send(data)
  }

  public async show({ request, response }: HttpContextContract) {
    const { status, data } = await Show(request.param('id'))
    return response.status(status).send(data)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Store(request.only(['name', 'latitude', 'longitude']), auth)
    return response.status(status).send(data)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Update(
      request.param('id'),
      request.only(['name', 'latitude', 'longitude']),
      auth
    )
    return response.status(status).send(data)
  }

  public async delete({ request, response, auth }: HttpContextContract) {
    const { status, data } = await Delete(request.param('id'), auth)
    return response.status(status).send(data)
  }
}
