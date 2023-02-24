import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'companies', column: 'name' })]),
    responsible: schema.string({ trim: true }),
    file: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'PNG', 'JPG'],
    }),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{field}} deve ser obrigatório!',
    'string': 'O campo {{field}} deve ser um texto!',
    'name.unique': 'Empresa já cadastrada!',
  }
}
