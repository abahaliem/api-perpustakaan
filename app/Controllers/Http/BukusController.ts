import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BukuValidator from 'App/Validators/BukuValidator'
import Buku from 'App/Models/Buku'

/**
    * @swagger
    * /api/v1/buku:
    *   get:
    *     tags:
    *       - Buku
    *     summary: get data buku (petugas)
    *     security:
    *       - bearerAuth: []
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

export default class BukusController {
  public async index({response}: HttpContextContract) {
    try {
        const IndexBuku = await Buku.query().preload('kategori').preload('users')

        response.ok({
          message : "Successfully display fields Data",
          data : IndexBuku
        })
    } catch (error) {
        response.badRequest(error)
    }
  }

/**
    * @swagger
    * /api/v1/buku:
    *   post:
    *     tags:
    *       - Buku
    *     summary: create data buku (petugas)
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Buku'
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
      const BukucrudValidator = await request.validate(BukuValidator)
      const newBuku = await Buku.create(BukucrudValidator)
        response.created({
          message : "Successfuly Create Data",
          data : newBuku
        })
    } catch (error) {
      response.badRequest(error)
    }
  }

  /**
    * @swagger
    * /api/v1/buku/{id}:
    *   get:
    *     tags:
    *       - Buku
    *     summary: get data buku (petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: buku id
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
    const BukuKategoriId = params.id
   try {
        const BukuId = await Buku.query().where('id', BukuKategoriId).preload('kategori').firstOrFail()
    response.ok({
      message : `Berhasil tampil Data untuk id ${BukuKategoriId}`,
      data : BukuId
    })
   } catch (error) {
      response.badRequest({
        message : "Data not Found!"
      })
   }

  }

  /**
    * @swagger
    * /api/v1/buku/{id}:
    *   put:
    *     tags:
    *       - Buku
    *     summary: update data Buku (Petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: buku id
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Buku'
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
  public async update({response, params, request}: HttpContextContract) {
    try {
        const BukuKategoriId = params.id
        const BukucrudValidator = await request.validate(BukuValidator)
               
        await Buku
          .query()
          .where('id', BukuKategoriId)
          .update({...BukucrudValidator, tahun_terbit: BukucrudValidator.tahun_terbit.toSQLDate()})

        response.created({
          message : "Data Updated !",
    
        })       

    } catch (error) {
       response.badRequest(error.message)
    }

  }

/**
    * @swagger
    * /api/v1/buku/{id}:
    *   delete:
    *     tags:
    *       - Buku
    *     summary: delete data buku (Petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: buku id
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
      const BukuKategoriId = params.id
      const DeleteKategori = await Buku.findOrFail(BukuKategoriId)
      
      await DeleteKategori.delete()

      response.ok({
        message : "Deleted Success!"
      })

    } catch (error) {
        response.badRequest({
          message : "Data Not Found!"
        })      
    }
  }
}
