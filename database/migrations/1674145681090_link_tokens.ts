import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinkTokens extends BaseSchema {
  protected tableName = 'link_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token', 255).notNullable().unique()
      table.integer('login_id').unsigned().references('id').inTable('logins').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
