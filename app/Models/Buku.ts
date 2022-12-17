import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, manyToMany,ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'
import User from './User'

/**
 * @swagger
 * definitions:
 *  Buku:
 *    type: object
 *    properties:
 *      judul:
 *        type: string
 *      ringkasan:
 *        type: string
 *      tahun_terbit:
 *        type: DateTime
 *      halaman:
 *        type: number
 *      kategori_id:
 *        type: number
 */
export default class Buku extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public judul:string

  @column()
  public ringkasan:string

  @column.date()
  public tahun_terbit: DateTime

  @column()
  public halaman:Number

  @column()
  public kategori_id:Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Kategori,{
    foreignKey : 'kategori_id',
  })
  public kategori: BelongsTo <typeof Kategori>;


  @manyToMany(()=> User,{
    localKey: 'id',
    pivotForeignKey: 'buku_id',
    relatedKey:'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'pinjams'
  })

  public users:ManyToMany <typeof User>
}
