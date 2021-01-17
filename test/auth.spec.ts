import test from 'japa'
import supertest from 'supertest'

import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const authUrl = '/v1/client/auth'

test.group('Auth', () => {
  test('ensure that creates a new user', async assert => {
    const { firstName, lastName, email, password } = await UserFactory.makeStubbed()

    const payload = { firstName, lastName, email, password }

    const payloadAssert = {
      first_name: firstName,
      last_name: lastName,
      email,
    }

    const { body } = await supertest(BASE_URL).post(`${authUrl}/signup`).send(payload).expect(201)

    assert.include(body, payloadAssert)
  })

  test('ensure that return a access token for a authenticated user', async assert => {
    const user = await UserFactory.makeStubbed()

    const { email, password } = user

    const payload = {
      email,
      password,
    }

    await user.save()

    const { body } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(payload).expect(201)

    assert.include(body, { type: 'bearer' })
  })

  test("ensure that a user logged out can't access the system", async assert => {
    const user = await UserFactory.makeStubbed()

    const { email, password } = user

    const payload = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(payload).expect(201)

    await supertest(BASE_URL)
      .post(`${authUrl}/logout`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    await supertest(BASE_URL)
      .post(`${authUrl}/logout`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
  })
})
