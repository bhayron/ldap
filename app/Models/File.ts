import Env from '@ioc:Adonis/Core/Env'
import { BaseModel, column, computed, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Company from './Company'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileCategory: 'image'

  @column()
  public fileName: string

  @column()
  public companyId: number

  @computed()
  public get url(): string {
    return `${Env.get('APP_URL')}/uploads/${this.fileName}`
  }

  @hasOne(() => Company, {
    foreignKey: 'companyId',
  })
  public company: HasOne<typeof Company>
}
