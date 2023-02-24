import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[]
  ) {
    const user = await auth.authenticate()

    if (!allowedRoles.includes(user.type)) {
      return response.unauthorized({
        error: { message: 'Acesso negado, você não tem permissão para executar essa ação' },
      })
    }

    await next()
  }
}
