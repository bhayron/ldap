import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import moment from 'moment-timezone'
import Env from '@ioc:Adonis/Core/Env'
import User from './User'
import LinkTokens from './LinkTOken'

enum UserTypes {
  'standard',
  'admin',
}

export default class Login extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public type: keyof typeof UserTypes

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @hasOne(() => User, { foreignKey: 'loginId' })
  public user: HasOne<typeof User>

  @hasMany(() => LinkTokens, {
    foreignKey: 'loginId',
  })
  public tokens: HasMany<typeof LinkTokens>

  @column.dateTime({
    autoCreate: true,
    serialize: (value) =>
      moment(new Date(value)).tz(Env.get('LOCAL_TIMEZONE')).format(Env.get('LEGIBLE_FORMAT')),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    serialize: (value) =>
      moment(new Date(value)).tz(Env.get('LOCAL_TIMEZONE')).format(Env.get('LEGIBLE_FORMAT')),
  })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Login) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
