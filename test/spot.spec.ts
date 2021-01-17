import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const spotsUrl = '/v1/client/spots'
const authUrl = '/v1/client/auth'
let spotId = ''

test.group('Spots', () => {
  test('ensure a user authenticated create a new spot', async assert => {
    const payload = {
      name: 'Casa da mãe Joana',
      latitude: 1,
      longitude: 1,
    }

    const authentication = {
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo123',
    }

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    {
      const { body } = await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      await supertest(BASE_URL)
        .post(`${spotsUrl}/new`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)

      assert.include(body, payload)
    }
  })

  test('ensure that a user can index his own spots in list', async assert => {
    const authentication = {
      email: 'caiosfr13@gmail.com',
      password: 'Ronaldo123',
    }

    const {
      body: { token },
    } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

    const {
      body: { data },
    } = await supertest(BASE_URL)
      .get(`${spotsUrl}/index?own=true&list=true&page=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.isArray(data)
    assert.lengthOf(data, 10)
  })
})

test('ensure that a user can index his own spots in range', async assert => {
  const authentication = {
    email: 'caiosfr13@gmail.com',
    password: 'Ronaldo123',
  }

  const {
    body: { token },
  } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

  const {
    body: { data },
  } = await supertest(BASE_URL)
    .get(`${spotsUrl}/index?own=true&latitude=1&longitude=1&distance=1&page=1`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  spotId = data[0].external_id

  assert.isArray(data)
  assert.lengthOf(data, 10)
})

test('ensure that a user can index all spots in list', async assert => {
  const authentication = {
    email: 'caiosfr13@gmail.com',
    password: 'Ronaldo123',
  }

  const {
    body: { token },
  } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

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
  const authentication = {
    email: 'caiosfr13@gmail.com',
    password: 'Ronaldo123',
  }

  const {
    body: { token },
  } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

  const {
    body: { data },
  } = await supertest(BASE_URL)
    .get(`${spotsUrl}/index?latitude=1&longitude=1&distance=1&page=1`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  assert.isArray(data)
  assert.lengthOf(data, 10)
})

test('ensure that a user can show his spot', async assert => {
  const authentication = {
    email: 'caiosfr13@gmail.com',
    password: 'Ronaldo123',
  }

  const assertion = {
    email: 'caiosfr13@gmail.com',
  }

  const {
    body: { token },
  } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

  const {
    body: { user },
  } = await supertest(BASE_URL)
    .get(`${spotsUrl}/show/${spotId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  assert.include(user, assertion)
})

test('ensure that a user can update his spot', async assert => {
  const authentication = {
    email: 'caiosfr13@gmail.com',
    password: 'Ronaldo123',
  }

  const payload = {
    name: 'Pagode da pressão',
    latitude: 2,
    longitude: 2,
  }

  const {
    body: { token },
  } = await supertest(BASE_URL).post(`${authUrl}/signin`).send(authentication).expect(201)

  const { body } = await supertest(BASE_URL)
    .put(`${spotsUrl}/show/${spotId}`)
    .send(payload)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  assert.include(body, payload)
})
