import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'

const Update = async ({ password }, externalId: string, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }
    const user = await User.findBy('external_id', externalId)

    if (user?.id === id) {
      user.password = password

      await user.save()
    }

    return { status: 200, data: user }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't update the password" } }
  }
}

export default Update
