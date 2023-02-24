import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import moment from 'moment-timezone'
import Env from '@ioc:Adonis/Core/Env'
import Login from './Login'
import Project from './Project'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public sector: string

  @column()
  public phone: string

  @column()
  public companyId: number

  @column()
  public loginId: number

  @belongsTo(() => Login, { foreignKey: 'loginId' })
  public login: BelongsTo<typeof Login>

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

  @manyToMany(() => Project, {
    pivotTable: 'userprojects',
  })
  public project: ManyToMany<typeof Project>
}
