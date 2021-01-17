import User from 'App/Models/User'

const Show = async (externalId: string) => {
  try {
    const user = await User.query().where('external_id', externalId).first()

    return { status: 200, data: user }
  } catch (error) {
    return { status: 400, data: { error: "Couldn't find user" } }
  }
}

export default Show
