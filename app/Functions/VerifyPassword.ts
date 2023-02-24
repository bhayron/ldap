import passwordValidator from 'password-validator'

export function verifyPassword(password: string, min = 8) {
  var schema = new passwordValidator()
  schema.is().min(min).is().max(100).has().symbols(1).has().letters().has().digits(2)

  const test = schema.validate(password, { list: true }) as any

  const convertMessage = {
    min: `possuir um minimo de: ${min} caracteres`,
    max: 'possuir menos de 100 caracateres',
    symbols: 'possuir ao menos 2 símbolos',
    letters: 'possuir letras',
    digits: 'possuir ao menos 2 números',
  }

  if (test.length > 0)
    return {
      error: {
        title: 'Validações',
        message: `Sua senha não cumpriu os seguintes requisitos:${test.map(
          (string: string) => ` ${convertMessage[string]}`
        )}`,
      },
    }
  else return { success: { message: 'Everything is Ok' } }
}
