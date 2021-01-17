import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Spot from 'App/Models/Spot'

const Update = async (externalId: string, { name, latitude, longitude }, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }
    const spot = await Spot.findBy('external_id', externalId)

    if (spot?.userId === id) {
      spot.name = name
      spot.latitude = latitude
      spot.longitude = longitude

      await spot.save()
    }

    return { status: 200, data: spot }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't update spot" } }
  }
}

export default Update
