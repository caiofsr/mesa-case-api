import test from 'japa'
import supertest from 'supertest'

import { UserFactory, SpotFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const spotsUrl = '/v1/client/spots'
const authUrl = '/v1/client/auth'
let spotId = ''

test.group('Spots', () => {
  test('ensure a user authenticated create a new spot', async assert => {
    const user = await UserFactory.makeStubbed()
    const {
      $attributes: { name, latitude, longitude },
    } = await SpotFactory.makeStubbed()

    const { email, password } = user

    const payload = {
      name,
      latitude,
      longitude,
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
      .post(`${spotsUrl}/new`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(201)

    assert.include(body, payload)
  })

  test('ensure that a user can index all spots in list', async assert => {
    const user = await UserFactory.makeStubbed()

    const { email, password } = user

    const authentication = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    await SpotFactory.createMany(10)

    const {
      body: { data },
    } = await supertest(BASE_URL)
      .get(`${spotsUrl}/index?list=true&page=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.isArray(data)
    assert.lengthOf(data, 10)
  })

  test('ensure that a user can index all spots in range', async assert => {
    const user = await UserFactory.makeStubbed()

    const { email, password } = user

    const authentication = {
      email,
      password,
    }

    await user.save()

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const { latitude, longitude } = await SpotFactory.create()

    const {
      body: { data },
    } = await supertest(BASE_URL)
      .get(`${spotsUrl}/index?latitude=${latitude}&longitude=${longitude}&distance=1&page=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.isArray(data)
  })

  test('ensure that a user can show his spot', async assert => {
    const user = await UserFactory.makeStubbed()
    const { name, latitude, longitude } = await SpotFactory.makeStubbed()

    const { firstName, lastName, email, password } = user

    const authentication = {
      email,
      password,
    }

    const payload = {
      name,
      latitude,
      longitude,
    }

    const assertion = {
      first_name: firstName,
      last_name: lastName,
      email,
    }

    await user.save()
    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const {
      body: { external_id: spotId },
    } = await supertest(BASE_URL)
      .post(`${spotsUrl}/new`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const {
      body: { user: response },
    } = await supertest(BASE_URL)
      .get(`${spotsUrl}/show/${spotId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.include(response, assertion)
  })

  test('ensure that a user can update his spot', async assert => {
    const user = await UserFactory.makeStubbed()
    const { name, latitude, longitude } = await SpotFactory.makeStubbed()

    const { email, password } = user

    const authentication = {
      email,
      password,
    }

    const payload = {
      name,
      latitude,
      longitude,
    }

    await user.save()
    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const {
      body: { external_id: spotId },
    } = await supertest(BASE_URL)
      .post(`${spotsUrl}/new`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const { body } = await supertest(BASE_URL)
      .put(`${spotsUrl}/show/${spotId}`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.include(body, payload)
  })
})
