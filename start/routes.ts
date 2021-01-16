import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/signup', 'AuthController.signUp')
  Route.post('/signin', 'AuthController.signIn')
}).prefix('v1/client/auth')
