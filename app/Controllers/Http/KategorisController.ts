import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KategoriCrudValidator from 'App/Validators/KategoriCrudValidator'
import Kategori from 'App/Models/Kategori'

export default class KategorisController {

/**
    * @swagger
    * /api/v1/kategori:
    *   get:
    *     tags:
    *       - Kategori
    *     summary: get data kategori (petugas)
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    *                   data: 
    *                       type: object
    *       400:
    *         description: Error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
*/

  public async index({response}: HttpContextContract) {
      try {
         const IndexKategori = await Kategori.query().preload('bukus')
        
         response.ok({
            messaage : "Successfully display fields data",
            data : IndexKategori
          })

      } catch (error) {
        response.badRequest({
          message : "Failed to display fields data"
        })
      }
   }

/**
    * @swagger
    * /api/v1/kategori:
    *   post:
    *     tags:
    *       - Kategori
    *     summary: create data kategori (petugas)
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Kategori'
    *     responses:
    *       201:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    *       400:
    *         description: Error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
*/   

  public async store({response, request}: HttpContextContract) {
   try {
        const kategorivalidator = await request.validate(KategoriCrudValidator)
        const newKategori = await Kategori.create(kategorivalidator)
          response.created({
              message : "Succesfully Create Data!",
              data : newKategori
          })
      }catch (error) {
         response.badRequest(error)    
   }
  }
   
/**
    * @swagger
    * /api/v1/kategori/{id}:
    *   get:
    *     tags:
    *       - Kategori
    *     summary: get data Kategori (petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: kategori id
    *     responses:
    *       201:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    *                   data: 
    *                       type: object
    *       400:
    *         description: Error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    */

  public async show({response, params}: HttpContextContract) {
    const KategoriByid = params.id
    try {
       
        const KategorId = await Kategori.query()
        .where('id', KategoriByid)
        .preload('bukus')
        .firstOrFail()
        
        response.ok({
          message : "Succes",
          data : KategorId

        })
    } catch (error) {
        response.badRequest({
          message : "Data not found!"
        })
      
    }
  }

/**
    * @swagger
    * /api/v1/kategori/{id}:
    *   put:
    *     tags:
    *       - Kategori
    *     summary: update data kategori (petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: kategori id
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Kategori'
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    *       400:
    *         description: Error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
*/

  public async update({request, response, params}: HttpContextContract) {
        try {
          const KategoriByid = params.id
          const kategorivalidator = await request.validate(KategoriCrudValidator)   

          await Kategori
          .query()
          .where('id', KategoriByid)
          .update(kategorivalidator)

          response.ok({
            message : "Data Updated !"
          })

        } catch (error) {
            response.badRequest({
              message : error
            })
        }
  }
/**
    * @swagger
    * /api/v1/kategori/{id}:
    *   delete:
    *     tags:
    *       - Kategori
    *     summary: delete data kategori (petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: kategori id
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
    *       400:
    *         description: Error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   status: 
    *                       type: string
    *                   message: 
    *                       type: string
*/

  public async destroy({response, params}: HttpContextContract) {
    try {
        const KategoriByid = params.id
        const DeleteKategori = await Kategori.findOrFail(KategoriByid)
        await DeleteKategori.delete()

        response.ok({
          message : "Succes Deleted!"
        })

    } catch (error) {
        response.badRequest({
          message : "data not found!"
        })

    }
  }
}


