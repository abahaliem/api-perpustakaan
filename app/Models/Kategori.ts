import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Buku from './Buku'

/**
 * @swagger
 * definitions:
 *  Kategori:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 */


export default class Kategori extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Buku, {
    foreignKey : 'kategori_id'
  })
  public bukus: HasMany<typeof Buku>

}
