import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    lastname: schema.string.optional({ trim: true }),
    sector: schema.string.optional({ trim: true }),
    phone: schema.string.optional({ trim: true }),
    type: schema.enum.optional(['standard', 'admin'] as const),
    password: schema.string.optional({ trim: true }),
    company_id: schema.number.optional([rules.exists({ column: 'id', table: 'companies' })]),
    login_id: schema.number.optional(),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'logins', column: 'email' }),
    ]),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{field}} é obrigatório!',
    'string': 'O campo {{field}} é uma string!',
    'email.unique': 'Email já cadastrado!',
    'email.email':
      'O email informado não segue os padrões de um email válido, por favor verifique e tente novamente.',
  }
}
