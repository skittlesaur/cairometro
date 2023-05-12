import { EmailTemplate, EmailVariables } from './send-email'

const getEmailDefaultVariables = <T extends EmailTemplate>(variables: EmailVariables<T>) => {
  if ('helpEmail' in variables)
    variables.helpEmail = process.env.HELP_EMAIL ?? ''

  return variables
}

export default getEmailDefaultVariables