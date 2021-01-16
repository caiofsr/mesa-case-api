import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const authUrl = '/v1/client/auth'

test.group('Auth', () => {
  test('ensure that creates a new user', async assert => {
    const payload = {
      firstName: 'Caio',
      lastName: 'Fernando',
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo123',
    }

    const payloadAssert = {
      first_name: 'Caio',
      last_name: 'Fernando',
      email: 'caiosfr13@gmail.com',
    }

    const { body } = await supertest(BASE_URL).post(`${authUrl}/signup`).send(payload).expect(201)

    assert.include(body, payloadAssert)
  })

  test('ensure that not create a new user with same email', async assert => {
    const payload = {
      firstName: 'Caio',
      lastName: 'Fernando',
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo123',
    }

    const { body } = await supertest(BASE_URL).post(`${authUrl}/signup`).send(payload).expect(400)

    assert.include(body, { error: 'Email já em uso' })
  })

  test('ensure that return a access token for a authenticated user', async assert => {
    const payload = {
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo123',
    }

    const { body } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(payload).expect(201)

    assert.include(body, { type: 'bearer' })
  })

  test('ensure that not authenticate a user with wrong credentials', async () => {
    const payload = {
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo12',
    }

    await supertest(BASE_URL).post(`${authUrl}/signin`).send(payload).expect(400)
  })
})
