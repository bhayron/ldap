import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.enu('file_category', ['image']).notNullable()
      table.string('file_name').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
