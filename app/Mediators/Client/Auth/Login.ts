import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'

const Login = async ({ email, password }: User, auth: AuthContract) => {
  const token = await auth.use('api').attempt(email, password)

  return { status: 201, data: token.toJSON() }
}

export default Login
