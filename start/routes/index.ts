import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './ldap'

Route.get('/', async () => {
  return { api: 'running' }
})
