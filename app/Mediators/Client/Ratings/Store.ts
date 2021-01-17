import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Rating from 'App/Models/Rating'
import Spot from 'App/Models/Spot'

const Store = async ({ comment, rate }: Rating, externalId: string, auth: AuthContract) => {
  try {
    const { id: userId } = auth.user?.$attributes as { id: number }

    const { id: spotId } = await Spot.query().where('external_id', externalId).firstOrFail()

    const rating = await Rating.create({ comment, rate, userId, spotId })

    return { status: 201, data: rating }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't register a new rating" } }
  }
}

export default Store
