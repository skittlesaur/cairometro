import mjml2html from 'mjml';
import sgMail from '@sendgrid/mail';
import getMjmlTemplate from './get-mjml-template';

const apiKey = process.env.SENDGRID_API_KEY ?? ''
sgMail.setApiKey(apiKey);

enum EmailTemplate {
  AUTHENTICATION = 'AUTHENTICATION',
  TICKET_UPDATE = 'TICKET_UPDATE'
}

type Variables = {
  [key: string]: string;
};

const sendEmail = async (recipient: string, template: EmailTemplate, variables?: Variables) => {
  var mjmlTemplate = getMjmlTemplate(template, variables!)

const { html } = mjml2html(mjmlTemplate!);

const message = {
    to: recipient,
    from: process.env.SENDGRID_FROM?? '',
    subject: template,
    html: html
}
sgMail.send(message).then(() => console.log('email has been sent.')).catch((err: { message: any; }) => console.log(err.message));
}

export default sendEmail;