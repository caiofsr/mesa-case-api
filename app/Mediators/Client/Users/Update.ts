import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'

const Update = async (
  { firstName, lastName, email, oldPassword, newPassword },
  externalId: string,
  auth: AuthContract
) => {
  try {
    const user = (await User.findBy('external_id', externalId)) as User
    const { email: oldEmail } = await auth.authenticate()

    if (oldPassword) {
      await auth.attempt(oldEmail, oldPassword)
      user.password = newPassword
    }

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email

    await user.save()

    return { status: 200, data: user }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't update user" } }
  }
}

export default Update
