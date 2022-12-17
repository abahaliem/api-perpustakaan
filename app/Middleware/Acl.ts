import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    let userrole = auth.user?.role
    if(userrole == 'petugas' ){
      await next()
    }else{
      return response.unauthorized({message : 'Anda bukan Petugas !'})
    }  
  }
}
