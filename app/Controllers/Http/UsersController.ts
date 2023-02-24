import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import Login from 'App/Models/Login'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const queryParams = request.qs()
    const users = await User.query()
      .if(queryParams.search, (query) => {
        query.where('name', 'like', `%${queryParams.search}%`)
      })
      .preload('login')
      .paginate(queryParams.page || 1, Env.get('DEFAULT_PERPAGE_LIST', '10'))
    return response.status(200).json({
      users,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const receivedPayload = await request.validate(CreateUserValidator)

    const user = await Login.create({
      password: receivedPayload.password,
      email: receivedPayload.email,
      type: receivedPayload.type,
    })

    await user.related('user').create({
      loginId: user.id,
      companyId: receivedPayload.company_id,
      name: receivedPayload.name,
      lastname: receivedPayload.lastname,
      sector: receivedPayload.sector,
      phone: receivedPayload.phone,
    })
    return response.status(200).json({
      user: receivedPayload,
      success: {
        title: 'Sucesso',
        message: 'Usuário cadastrado com sucesso!',
      },
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.unauthorized({
        title: 'Erro',
        message: 'Usuário não encontrado!',
      })
    }
    return response.status(200).json({
      user,
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const receivedPayload = await request.validate(UpdateUserValidator)

    const user = await Login.findBy('id', params.id)
    await user?.load('user')
    const loginformation = {
      password: receivedPayload.password,
      email: receivedPayload.email,
      type: receivedPayload.type,
    }
    const userInformation = {
      companyId: receivedPayload.company_id,
      name: receivedPayload.name,
      lastname: receivedPayload.lastname,
      sector: receivedPayload.sector,
      phone: receivedPayload.phone,
    }
    await user?.merge(loginformation).save()
    await user?.user.merge(userInformation).save()

    return response.status(200).json({
      receivedPayload,
      success: {
        title: 'Sucesso',
        message: 'Usuário atualizado com sucesso!',
      },
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({
        success: {
          title: 'Sucesso',
          message: 'Usuário deletado com sucesso!',
        },
      })
    } catch (error) {
      return response.status(500).json({
        error: {
          title: 'Erro inesperado',
          message: 'Não foi possivel deletar um usuário!',
        },
      })
    }
  }
}
