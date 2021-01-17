import Spot from 'App/Models/Spot'

const Show = async (externalId: string) => {
  try {
    const spot = await Spot.query()
      .where('external_id', externalId)
      .preload('user')
      .preload('ratings')
      .first()

    return { status: 200, data: spot }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't show spot" } }
  }
}

export default Show
