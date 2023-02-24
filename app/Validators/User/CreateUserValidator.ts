import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    lastname: schema.string({ trim: true }),
    password: schema.string({ trim: true }),
    sector: schema.string({ trim: true }),
    phone: schema.string({ trim: true }),
    type: schema.enum(['standard', 'admin'] as const),
    company_id: schema.number([rules.exists({ column: 'id', table: 'companies' })]),
    email: schema.string({ trim: true }, [
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
