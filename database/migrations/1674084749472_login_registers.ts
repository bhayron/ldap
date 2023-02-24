import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LoginRegisters extends BaseSchema {
  protected tableName = 'login_registers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('login_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('logins')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
