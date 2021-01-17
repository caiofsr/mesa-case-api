import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await UserFactory.with('spots', 2, spot => {
      spot.with('user')
    })
      .with('ratings', 2, rating => {
        rating.with('spot', 1, spot => {
          spot.with('user')
        })
      })
      .createMany(2)
  }
}
