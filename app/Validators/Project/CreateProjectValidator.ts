import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    contractorDepartment: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    deliveryDate: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    companyId: schema.number(),
    userId: schema.number(),
    projectUsers: schema.array().members(schema.number()),
  })

  public messages: CustomMessages = {}
}
