import sgMail from '@sendgrid/mail'
import mjml2html from 'mjml'

import getMjmlTemplate from './get-mjml-template'

export enum EmailTemplate {
  AUTHENTICATION = 'AUTHENTICATION',
  TICKET_UPDATE = 'TICKET_UPDATE'
}

type Variables = {
  [key: string]: string;
};

const sendEmail = async (recipient: string, template: EmailTemplate, variables?: Variables) => {
  const mjmlTemplate = getMjmlTemplate(template, variables ?? {})
  
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