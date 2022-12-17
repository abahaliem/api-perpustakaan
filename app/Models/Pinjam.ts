import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Buku from './Buku'
import User from './User'

/**
* @swagger
* definitions:
*   Pinjam:
*     type: object
*     properties: 
*       tanggal_pinjam: 
*         type: date
*         format: date
*         example: "2022-10-13"
*       tanggal_kembali: 
*         type: date
*         format: date
*         example: "2022-10-13"
*     required:
*       - tanggal_pinjam
*       - tanggal_kembali
*/

export default class Pinjam extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public buku_id:number

  @column()
  public tanggal_pinjam: Date

  @column()
  public tanggal_kembali: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Buku,{
    foreignKey : 'buku_id',
  })
  public buku: BelongsTo <typeof Buku>;

  @belongsTo(() => User,{
    foreignKey : 'user_id',
  })
  public users: BelongsTo <typeof User>;
}
