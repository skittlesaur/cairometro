import sgMail from '@sendgrid/mail'
import mjml2html from 'mjml'

import getEmailDefaultVariables from './email-defaults'
import getMjmlTemplate from './get-mjml-template'

export enum EmailTemplate {
  SIGNUP = 'signup',
  LOGIN = 'login'
}

interface SignupEmailVariables {
  name: string;
  otp: Array<number>;
  magicLink: string;
  helpEmail?: string;
}

interface LoginEmailVariables {
  name: string;
  otp: Array<number>;
  magicLink: string;
  helpEmail?: string;
}

interface EmailVariablesMap {
  [EmailTemplate.SIGNUP]: SignupEmailVariables;
  [EmailTemplate.LOGIN]: LoginEmailVariables;
}

export type EmailVariables<T extends EmailTemplate> = EmailVariablesMap[T];

const sendEmail = async <T extends EmailTemplate>(
  recipient: string,
  subject: string,
  template: T,
  variables: EmailVariables<T>,
) => {
  variables = getEmailDefaultVariables(variables)
  const mjmlTemplate = getMjmlTemplate(template, variables)

  if (!mjmlTemplate) throw new Error('No template found')

  const { html } = mjml2html(mjmlTemplate)

  const message = {
    to: recipient,
    from: process.env.SENDGRID_FROM ?? '',
    subject,
    html: html,
  }
  
  await sgMail.send(message)
  console.log(`Email sent to ${recipient}`)
}

export default sendEmail