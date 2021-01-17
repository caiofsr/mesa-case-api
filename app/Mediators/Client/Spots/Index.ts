import Logger from '@ioc:Adonis/Core/Logger'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

import Spot from 'App/Models/Spot'

const Index = async ({ own, list, distance, page, latitude, longitude }, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }
    const limit = 10

    if (own === 'true') {
      if (list === 'true') {
        const spots = await Spot.query()
          .where('user_id', id)
          .preload('user')
          .preload('ratings')
          .orderBy('name')
          .paginate(page, limit)
        return { status: 200, data: spots }
      } else {
        const spots = await Spot.query()
          .where('user_id', id)
          .preload('user')
          .preload('ratings')
          .apply(scopes =>
            scopes.nearby(parseFloat(latitude), parseFloat(longitude), parseInt(distance))
          )
          .paginate(page, limit)

        return { status: 200, data: spots }
      }
    } else {
      if (list === 'true') {
        const spots = await Spot.query()
          .preload('user')
          .preload('ratings')
          .orderBy('name')
          .paginate(page, limit)
        return { status: 200, data: spots }
      } else {
        const spots = await Spot.query()
          .preload('user')
          .preload('ratings')
          .apply(scopes =>
            scopes.nearby(parseFloat(latitude), parseFloat(longitude), parseInt(distance))
          )
          .paginate(page, limit)

        return { status: 200, data: spots }
      }
    }
  } catch (error) {
    Logger.error(error)
    return { status: 400, data: { error: 'Não foi possível buscar os locais' } }
  }
}

export default Index
