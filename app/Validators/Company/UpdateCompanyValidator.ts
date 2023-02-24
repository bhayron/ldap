import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    responsible: schema.string.optional({ trim: true }),
    file: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'PNG', 'JPG'],
    }),
  })

  public messages: CustomMessages = {
    string: 'O campo {{field}} deve ser um texto!',
  }
}
