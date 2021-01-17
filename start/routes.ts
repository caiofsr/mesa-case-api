import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/signup', 'AuthController.signUp')
  Route.post('/signin', 'AuthController.signIn')
}).prefix('v1/client/auth')

Route.group(() => {
  Route.get('/index', 'SpotsController.index')
  Route.get('/show/:id', 'SpotsController.show')
  Route.post('/new', 'SpotsController.store')
  Route.put('/show/:id', 'SpotsController.update')
  Route.delete('/delete/:id', 'SpotsController.delete')
})
  .prefix('v1/client/spots')
  .middleware('auth')
