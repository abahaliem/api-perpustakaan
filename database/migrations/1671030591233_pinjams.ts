import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pinjams'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      
      table.integer('buku_id')
      .unsigned()
      .references('bukus.id')

      table.unique(['user_id','buku_id'])

      table.date('tanggal_pinjam')
      table.date('tanggal_kembali')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
