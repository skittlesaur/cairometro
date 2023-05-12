import sgMail from '@sendgrid/mail'
import mjml2html from 'mjml'

import getMjmlTemplate from './get-mjml-template'

export enum EmailTemplate {
  SIGNUP = 'signup',
}

interface SignupEmailVariables {
  name: string;
  otp: number;
  magicLink: string;
}

interface EmailVariablesMap {
  [EmailTemplate.SIGNUP]: SignupEmailVariables;
}

export type EmailVariables<T extends EmailTemplate> = EmailVariablesMap[T];

const sendEmail = async <T extends EmailTemplate>(
  recipient: `${string}@${string}.${string}`,
  template: T,
  variables: EmailVariables<T>,
) => {
  const mjmlTemplate = getMjmlTemplate(template, variables)

  if (!mjmlTemplate) throw new Error('No template found')

  const { html } = mjml2html(mjmlTemplate)

  const message = {
    to: recipient,
    from: process.env.SENDGRID_FROM ?? '',
    subject: template,
    html: html,
  }
  sgMail.send(message)
    .then(() => console.log('email has been sent.'))
    .catch((err: { message: string }) => console.log(err.message))
}

export default sendEmail