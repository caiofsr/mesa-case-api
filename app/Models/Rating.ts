import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Rating extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ columnName: 'external_id' })
  public externalId: string

  @column({ columnName: 'user_id', serializeAs: null })
  public userId: number

  @column({ columnName: 'spot_id', serializeAs: null })
  public spotId: number

  @column()
  public comment: string

  @column()
  public rating: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static createExternalId(rating: Rating) {
    rating.externalId = uuid()
  }
}
