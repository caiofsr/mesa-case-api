import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Spot from 'App/Models/Spot'

const Delete = async (externalId: string, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }
    const spot = await Spot.findBy('external_id', externalId)

    if (spot?.userId === id) {
      await spot.delete()
    }

    return { status: 204 }
  } catch (error) {
    return { status: 400, data: { error: 'Não foi possível remover o local' } }
  }
}

export default Delete
