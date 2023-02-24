import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'

export default class ForgotPassword extends BaseMailer {
  constructor(
    private meta: { to: string; name: string; productName: string; resetPasswordUrl: string }
  ) {
    super()
  }
  public prepare(message: MessageContract) {
    message
      .to(this.meta.to)
      .from(`${Env.get('SMTP_EMAIL')}`)
      .subject('Simple Cycle Studio: Recuperação de Senha')
      .embed(Application.publicPath('LogoSCS.png'), 'logo')
      .htmlView('emails/forgotpassword', {
        productName: 'Simple Cycle Studio',
        name: this.meta.name,
        resetPasswordUrl: this.meta.resetPasswordUrl,
      })
  }
}
