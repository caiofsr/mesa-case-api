import test from 'japa'
import supertest from 'supertest'

import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const profileUrl = '/v1/client/profile'
const authUrl = '/v1/client/auth'

test.group('Profile', () => {
  test('ensure that creates a new user', async assert => {
    const { firstName, lastName, email, password } = await UserFactory.makeStubbed()

    const payload = { firstName, lastName, email, password }

    const payloadAssert = {
      first_name: firstName,
      last_name: lastName,
      email,
    }

    const { body } = await supertest(BASE_URL).post(`${profileUrl}`).send(payload).expect(201)

    assert.include(body, payloadAssert)
  })

  test('ensure that a user update his info', async assert => {
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

    const { externalId } = user
    const {
      firstName,
      lastName,
      email: updatedEmail,
      password: newPassword,
    } = await UserFactory.makeStubbed()

    const updatedPayload = {
      firstName,
      lastName,
      email: updatedEmail,
      oldPassword: password,
      newPassword,
    }

    const assertion = {
      first_name: firstName,
      last_name: lastName,
      email: updatedEmail,
    }

    const { body } = await supertest(BASE_URL)
      .put(`${profileUrl}/${externalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedPayload)
      .expect(200)

    assert.include(body, assertion)
  })

  test('ensure that a user access his info', async assert => {
    const user = await UserFactory.makeStubbed()

    const { firstName, lastName, email, password } = user

    const payload = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(payload).expect(201)

    const { externalId } = user

    const assertion = {
      external_id: externalId,
      first_name: firstName,
      last_name: lastName,
      email,
    }

    const { body } = await supertest(BASE_URL)
      .get(`${profileUrl}/${externalId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.include(body, assertion)
  })
})
