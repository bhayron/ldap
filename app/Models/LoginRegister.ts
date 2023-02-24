import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import moment from 'moment-timezone'
import Env from '@ioc:Adonis/Core/Env'
import Login from './Login'

export default class LoginRegister extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public login_id: number

  @belongsTo(() => Login, { foreignKey: 'login_id' })
  public login: BelongsTo<typeof Login>

  @column.dateTime({
    autoCreate: true,
    serialize: (value) =>
      moment(new Date(value)).tz(Env.get('LOCAL_TIMEZONE')).format(Env.get('LEGIBLE_FORMAT')),
  })
  public createdAt: DateTime
}
