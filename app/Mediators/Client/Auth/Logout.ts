import { AuthContract } from '@ioc:Adonis/Addons/Auth'

const Logout = async (auth: AuthContract) => {
  await auth.use('api').logout()

  return { status: 204 }
}

export default Logout
