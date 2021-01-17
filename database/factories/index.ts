import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Spot from 'App/Models/Spot'
import Rating from 'App/Models/Rating'

export const UserFactory = Factory.define(User, ({ faker }) => {
  faker.locale = 'pt_BR'
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('spots', () => SpotFactory)
  .relation('ratings', () => RatingFactory)
  .build()

export const SpotFactory = Factory.define(Spot, ({ faker }) => {
  faker.locale = 'pt_BR'
  return {
    name: faker.company.companyName(),
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
  }
})
  .before('makeStubbed', (_, model) => {
    model.id = Math.floor(Math.random() * (100 - 50) + 50)
  })
  .relation('user', () => UserFactory)
  .relation('ratings', () => RatingFactory)
  .build()

export const RatingFactory = Factory.define(Rating, ({ faker }) => {
  faker.locale = 'pt_BR'
  return {
    rate: faker.random.number(5),
    comment: faker.lorem.text(),
  }
})
  .before('makeStubbed', (_, model) => {
    model.id = Math.floor(Math.random() * (100 - 50) + 50)
  })
  .relation('user', () => UserFactory)
  .relation('spot', () => SpotFactory)
  .build()
