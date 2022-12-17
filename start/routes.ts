/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

  
  Route.post('/register','AuthController.register')
  Route.post('/login','AuthController.login')
  Route.post('/logout','AuthController.logout').middleware('auth')  
  Route.post('/otp-confirmation','AuthController.otpConfirmation').as('otpVerify')
  Route.get('/me','AuthController.me').middleware(['auth','verify'])

  Route.resource('kategori', 'KategorisController').apiOnly().middleware({'*':['auth','verify','acl']})
  Route.resource('buku', 'BukusController').apiOnly().middleware({'*':['auth','verify','acl']})
  
  Route.post('/profiles','AuthController.UpdateProfile').middleware(['auth','verify'])
  Route.post('/buku/:id/pinjam','PinjamsController.store').middleware(['auth','verify'])
  Route.get('/pinjam','PinjamsController.index').middleware(['auth','verify'])
  Route.get('/pinjam/:id','PinjamsController.show').middleware(['auth','verify'])

}).prefix('/api/v1')

