import Rating from 'App/Models/Rating'
import Spot from 'App/Models/Spot'

const Show = async (externalId: string, { page }) => {
  try {
    const { id: spotId } = await Spot.query().where('external_id', externalId).firstOrFail()

    const spots = await Rating.query()
      .where('spot_id', spotId)
      .preload('user')
      .paginate(parseInt(page), 10)

    return { status: 200, data: spots }
  } catch (error) {
    console.log(error)
    return { status: 400, data: { error: "Couldn't show the ratings" } }
  }
}

export default Show
