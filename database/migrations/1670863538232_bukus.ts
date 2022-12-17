import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bukus'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('judul')
      table.string('ringkasan')
      table.date('tahun_terbit')
      table.integer('halaman')
      table.integer('kategori_id')
        .unsigned()
        .references('id')
        .inTable('kategoris')
        .onDelete('CASCADE')
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
