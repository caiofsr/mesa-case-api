import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'

const Update = async ({ firstName, lastName, email }, externalId: string, auth: AuthContract) => {
  try {
    const { id } = auth.user?.$attributes as { id: number }
    const user = await User.findBy('external_id', externalId)

    if (user?.id === id) {
      if (firstName) user.firstName = firstName
      if (lastName) user.lastName = lastName
      if (email) user.email = email

      await user.save()
    }

    return { status: 200, data: user }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't update user" } }
  }
}

export default Update
