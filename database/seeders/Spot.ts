import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SpotFactory } from 'Database/factories'

export default class SpotSeeder extends BaseSeeder {
  public async run() {
    await SpotFactory.with('user')
      .with('ratings', 2, rating => {
        rating.with('user')
      })
      .createMany(2)
  }
}
