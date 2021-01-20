import User from 'App/Models/User'

const Store = async ({ firstName, lastName, email, password }: User) => {
  const userExists = await User.findBy('email', email)

  if (!userExists) {
    const user = await User.create({ firstName, lastName, email, password })

    return { status: 201, data: user }
  } else {
    return { status: 400, data: { error: 'Email already in use' } }
  }
}

export default Store
