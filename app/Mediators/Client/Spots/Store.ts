import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Spot from 'App/Models/Spot'

const Store = async ({ name, latitude, longitude }: Spot, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }

    const spot = await Spot.create({ name, latitude, longitude, userId: id })

    return { status: 201, data: spot }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't register a new spot" } }
  }
}

export default Store
