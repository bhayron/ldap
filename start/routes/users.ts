import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController')
}).middleware(['auth', 'acl:admin'])
