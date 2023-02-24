import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({}, [rules.exists({ table: 'link_tokens', column: 'token' })]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages = {
    'password.minLength': 'A senha deve ser maior que 8 caracteres!',
    'token.exists': 'Esse token não existe em nossa base de dados!',
  }
}
