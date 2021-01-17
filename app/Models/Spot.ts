import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Rating from 'App/Models/Rating'
import Database from '@ioc:Adonis/Lucid/Database'
import User from './User'

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

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>

  public static nearby = scope((query, latitude, longitude, distance) => {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  })
}
