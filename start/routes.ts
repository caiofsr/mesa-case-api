import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/signin', 'AuthController.signIn')
  Route.post('/logout', 'AuthController.logout').middleware('auth')
}).prefix('v1/client/auth')

Route.group(() => {
  Route.get('/', 'SpotsController.index')
  Route.get('/:id', 'SpotsController.show')
  Route.post('/', 'SpotsController.store')
  Route.put('/:id', 'SpotsController.update')
  Route.delete('/:id', 'SpotsController.delete')
})
  .prefix('v1/client/spots')
  .middleware('auth')

Route.group(() => {
  Route.get('/:id', 'RatingsController.show')
  Route.post('/:id', 'RatingsController.store')
})
  .prefix('v1/client/ratings')
  .middleware('auth')

Route.group(() => {
  Route.get('/:id', 'UsersController.show').middleware('auth')
  Route.post('/', 'UsersController.store')
  Route.put('/:id', 'UsersController.update').middleware('auth')
}).prefix('v1/client/profile')
