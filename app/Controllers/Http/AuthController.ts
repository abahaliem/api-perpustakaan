import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import AuthValidateValidator from 'App/Validators/AuthValidateValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
/**
    * @swagger
    * /api/v1/register:
    *   post:
    *     tags:
    *       - Authentication
    *     summary: Register User
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/User'
    *         application/json:
    *           schema:
    *             $ref: '#definitions/User'
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

       public async register({request, response}:HttpContextContract){
        try {
         
           const authValidate = await request.validate(AuthValidateValidator)
           const newUser = await User.create(authValidate)
           const otp_code = Math.floor(10000 + Math.random()* 90000)   
           await Database.table('otp_codes').insert({otp_code: otp_code, user_id:newUser.id})
        
            await Mail.send((message) => {
                        message
                        .from('info@appperpus.com')
                        .to(newUser.name)
                        .subject('Welcome Onboard!')
                        .htmlView('emails/otp_verification', {otp_code})                                      
                        })
                                                         
            response.created({
                status : "Success",
                data : newUser,
                message : "Register Success, please verify your otp code"
            })
        } catch (error) {
           return response.unprocessableEntity({
           error:error
           })
        }
    }
    
 /**
    * @swagger
    * /api/v1/login:
    *   post:
    *     tags:
    *       - Authentication
    *     summary: Login User
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *               type: object
    *               properties:
    *                   email:
    *                       type: string
    *                       format: email
    *                       example: email1@gmail.com
    *                   password:
    *                       type: string
    *                       example: 12345678
    *               required:
    *                   - email
    *                   - password
    *         application/json:
    *           schema:
    *               type: object
    *               properties:
    *                   email:
    *                       type: string
    *                       format: email
    *                       example: email1@gmail.com
    *                   password:
    *                       type: string
    *                       example: 12345678
    *               required:
    *                   - email
    *                   - password
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
    *                   token: 
    *                       type: object
    *       401:
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
    public async login ({request, response, auth}:HttpContextContract){
        try {
           const loginValidation = schema.create({
                email: schema.string(),
                password : schema.string()
           })    
     await request.validate({schema:loginValidation})
            const email = request.input('email')
            const password = request.input('password')

           const token = await auth.use('api').attempt(email, password, {
            expiresIn: '7 Days'
           })

           return response.ok({
            message : "Login Success", token
           })

        } catch (error) {
            response.badRequest({
                message : error.message
            })
        }

    }

/**
    * @swagger
    * /api/v1/logout:
    *   post:
    *     tags:
    *       - Authentication
    *     summary: Logout User (petugas, user)
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
    *       401:
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
    public async logout({auth,response}:HttpContextContract){
        await auth.use('api').logout()
        if (auth.use('api').isLoggedOut){
            response.ok({
                status:"Success",
                message: "Logout Success"
            })
        }else{
            response.badRequest({
                status:"error",
                message: "Logout Gagal"
            })
        }
    }

    public async me ({auth, response}:HttpContextContract){
        const user = auth.user

        return response.ok({
            message : user
        })
    }
/**
    * @swagger
    * /api/v1/profiles:
    *   post:
    *     tags:
    *       - Authentication
    *     summary: User Update Profile
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *             $ref: '#definitions/Profile'
    *         application/json:
    *           schema:
    *             $ref: '#definitions/Profile'
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
    public async UpdateProfile({auth, response, request}:HttpContextContract){
        const authUser = auth.user
        const profileValidate = schema.create({
            alamat: schema.string(),
            bio : schema.string(),
        })

        await request.validate({schema:profileValidate})
        const  bio = request.input('bio')
        const alamat = request.input('alamat')
        const persistancePayload = {
            bio, 
            alamat
        };
        await authUser?.related('profile').updateOrCreate({}, persistancePayload)      
    
       return response.created({
            message :"Success update profile"
       })
    }

/**
    * @swagger
    * /api/v1/otp-confirmation:
    *   post:
    *     tags:
    *       - Authentication
    *     summary: Otp Confirmation
    *     requestBody:
    *       required: true
    *       content:
    *         application/x-www-form-urlencoded:
    *           schema:
    *               type: object
    *               properties:
    *                   email:
    *                       type: string
    *                       format: email
    *                       example: email1@gmail.com
    *                   otp_code:
    *                       type: string
    *                       example: 567201
    *               required:
    *                   - email
    *                   - otp_code
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
    public async otpConfirmation({request, response}:HttpContextContract){
        let otp_code = request.input('otp_code')
        let email = request.input('email')
        let user = await User.findByOrFail('email', email)
        let checkOtp = await Database.query().from('otp_codes').where('otp_code', otp_code).first()

        if(user?.id == checkOtp.user_id){
            user.isVerified = true
            await user?.save()

            return response.status(200).json({message : 'Success Verified'})

        }else{

            return response.status(400).json({message : 'Failed Verified'})
        }

    }
}