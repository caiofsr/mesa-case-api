import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RatingFactory } from 'Database/factories'

export default class RatingSeeder extends BaseSeeder {
  public async run() {
    await RatingFactory.with('user', 1)
      .with('spot', 1, spot => {
        spot.with('user')
      })
      .createMany(5)
  }
}
