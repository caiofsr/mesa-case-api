import test from 'japa'
import supertest from 'supertest'

import { RatingFactory, SpotFactory, UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const ratingsUrl = '/v1/client/ratings'
const authUrl = '/v1/client/auth'

test.group('Ratings', () => {
  test('ensure that a user rate a spot', async assert => {
    const user = await UserFactory.makeStubbed()
    const { externalId } = await SpotFactory.create()
    const { comment, rate } = await RatingFactory.makeStubbed()

    const { email, password } = user

    const payload = {
      comment,
      rate,
    }

    const authentication = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const { body } = await supertest(BASE_URL)
      .post(`${ratingsUrl}/new/${externalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(201)

    assert.include(body, payload)
  })

  test('ensure that the user can see all ratings for a spot', async assert => {
    const user = await UserFactory.makeStubbed()
    const { externalId } = await SpotFactory.with('ratings', 6).create()

    const { email, password } = user

    const authentication = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const {
      body: { data },
    } = await supertest(BASE_URL)
      .get(`${ratingsUrl}/show/${externalId}?page=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.isArray(data)
  })
})
