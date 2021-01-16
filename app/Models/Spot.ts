import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Rating from 'App/Models/Rating'

export default class Spot extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ columnName: 'external_id' })
  public externalId: string

  @column({ columnName: 'user_id', serializeAs: null })
  public userId: number

  @column()
  public name: string

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static createExternalId(spot: Spot) {
    spot.externalId = uuid()
  }

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>
}
