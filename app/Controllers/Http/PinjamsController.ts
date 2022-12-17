
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from '@ioc:Adonis/Core/Validator'
import Pinjam from 'App/Models/Pinjam';

export default class PinjamsController {

/**
    * @swagger
    * /api/v1/buku/{buku_id}/pinjam:
    *   post:
    *     tags:
    *       - Pinjam
    *     summary: create data pinjam (user & petugas)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: buku_id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: buku id
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Pinjam'
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

    public async store ({request, auth, response, params}: HttpContextContract) {        
        try {
            const pinjamValidate = schema.create({
                tanggal_pinjam: schema.date({format: 'sql'}),
                tanggal_kembali: schema.date({format: 'sql'})
            })
            await request.validate({schema:pinjamValidate})

            const userDataId = auth.user?.id;

            await Pinjam.create({
                user_id : userDataId,
                buku_id : params.id,
                tanggal_pinjam : request.input('tanggal_pinjam'),
                tanggal_kembali: request.input('tanggal_kembali')

            })

            response.ok({
                message:"berhasil tambah data pinjam"
            })

        } catch (error) {
         response.badRequest({
            message: error,
         })
        }

    }
/**
    * @swagger
    * /api/v1/pinjam:
    *   get:
    *     tags:
    *       - Pinjam
    *     summary: get All data Pinjam (petugas, user)
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
 
    public async index ({response}:HttpContextContract) {
        try {
            const dataPinjam = await Pinjam.query()
                                    .preload('buku')
                                    .preload('users')

            response.ok({
                message : "Success menampilkan Data peminjam buku",
                data: dataPinjam
            })
        } catch (error) {
            response.badRequest({
                message: error
            })
        }

    }

/**
    * @swagger
    * /api/v1/pinjam/{id}:
    *   get:
    *     tags:
    *       - Pinjam
    *     summary: get data pinjam (petugas, user)
    *     security:
    *       - bearerAuth: []
    *     parameters: 
    *       -   in: path
    *           name: id
    *           scheme: 
    *               type: integer
    *           required: true
    *           description: pinjam id
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
    public async show ({params, response}:HttpContextContract){
        try {
            const showDataPinjam = await Pinjam.query()
                                        .where('id',params.id)
                                        .preload('buku')
                                        .preload('users')
                                        .firstOrFail()
            response.ok({
                message : 'Success Menampilkan data peminjam',
                data : showDataPinjam
            })

        } catch (error) {
            response.badRequest({
                message : error
            })
        }
    }
}
