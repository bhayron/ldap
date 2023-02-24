import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import Login from 'App/Models/Login'
import LoginRegister from 'App/Models/LoginRegister'
import ForgotPasswordValidator from 'App/Validators/Password/ForgotPasswordValidator'
import { uid } from 'rand-token'
import ResetPasswordValidator from 'App/Validators/Password/ResetPasswordValidator'
import LinkTokens from 'App/Models/LinkTOken'

import ForgotPassword from 'App/Mailers/Mail'

export default class AuthController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    const login = await Login.query().where('email', email).orderBy('created_at', 'desc').first()

    if (!login) {
      return response.unauthorized({
        title: 'Erro',
        message:
          'Suas credenciais não existem ou estão inválidas, caso o erro persista clique no botão "esqueceu a senha" ou entre em contato com nosso suporte!',
      })
    }
    if (!(await Hash.verify(login.password, password))) {
      return response.unauthorized({
        title: 'Erro',
        message:
          'Suas credenciais não existem ou estão inválidas, caso o erro persista clique no botão "esqueceu a senha" ou entre em contato com nosso suporte!',
      })
    }
    const token = await auth.use('api').generate(login, {
      expiresIn: Env.get('TOKEN_DEFAULT_EXPIRATION'),
      user_id: login.id,
    })
    await LoginRegister.create({
      login_id: login.id,
    })
    return { token: token, user: login }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200).json({
      success: {
        title: 'Sucesso',
        message: 'Usuário deslogado com sucesso!',
      },
    })
  }

  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotPasswordValidator)
    const user = await Login.findByOrFail('email', email)
    const token = uid(6)
    const resetPasswordUrl = `${Env.get('BASE_URL')}`
    await user.related('tokens').updateOrCreate(
      { loginId: user.id },
      {
        token,
      }
    )
    await user.load('user')
    const resetPasswordUrlWithToken = `${resetPasswordUrl}?token=${token}`

    new ForgotPassword({
      productName: 'Simple Cycle Studio',
      name: user.user.name,
      resetPasswordUrl: resetPasswordUrlWithToken,
      to: email,
    }).send()

    return response.status(200).json({
      success: {
        title: 'Sucesso',
        message: 'Um token foi enviado para seu email!',
      },
    })
  }
  public async resetPassword({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetPasswordValidator)

    const userToken = await LinkTokens.findByOrFail('token', token)
    const tokenAge = Math.abs(userToken.createdAt.diffNow('hours').hours)

    if (tokenAge > 2) {
      return response.unauthorized({
        title: 'Erro',
        message: 'Sua solicitação de redefinição de senha foi a mais de 2 horas!',
      })
    }

    await userToken.load('user')
    await userToken.user
      .merge({
        password: password,
      })
      .save()

    await userToken.delete()

    return response.status(200).json({
      success: {
        title: 'Sucesso',
        message: 'Senha alterada com sucesso!',
      },
    })
  }
}
