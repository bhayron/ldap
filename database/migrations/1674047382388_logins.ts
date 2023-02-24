import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'logins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('password', 255)
      table.string('email', 60).notNullable().unique()
      table.enum('type', ['standard', 'admin']).defaultTo('standard')
      table.boolean('has_first_access').defaultTo(false).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
