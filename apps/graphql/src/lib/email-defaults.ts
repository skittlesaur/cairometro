import { EmailTemplate, EmailVariables } from './send-email'

const getEmailDefaultVariables = <T extends EmailTemplate>(variables: EmailVariables<T>) => {
  if (!variables.helpEmail) {
    variables.helpEmail = process.env.HELP_EMAIL
  }

  return variables
}

export default getEmailDefaultVariables