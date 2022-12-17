import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 45).notNullable()
      table.string('email', 45).notNullable().unique()
      table.string('password', 255).notNullable()
      table.enu('role',['petugas','user']).defaultTo('user')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
     
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
