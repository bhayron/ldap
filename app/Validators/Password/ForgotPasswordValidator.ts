import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'logins', column: 'email' })]),
  })

  public messages: CustomMessages = {
    'email.exists': 'Esse email não existe em nossa base de dados!',
  }
}
