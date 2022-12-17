import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import Buku from './Buku'

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      role:
 *        type: string 
 *    required:
 *      - name
 *      - email
 *      - password
 *      - role   
 */



export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column({columnName: 'isVerified'})
  public isVerified: boolean

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Profile, {
    foreignKey: 'user_id'
  } )
  public profile: HasOne<typeof Profile>

  @manyToMany(()=> Buku,{
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey:'id',
    pivotRelatedForeignKey: 'buku_id'
  })

  public bukus:ManyToMany<typeof Buku>
}
