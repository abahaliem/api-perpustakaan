import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class Verify {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let userVerif = auth.user?.isVerified
    if(userVerif){
      await next()
    }else{
      return response.unauthorized({message : 'Akun belum terverifikasi'})
    }  
  }
}
