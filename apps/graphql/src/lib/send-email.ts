import sgMail from '@sendgrid/mail'
import mjml2html from 'mjml'

import getEmailDefaultVariables from './email-defaults'
import getMjmlTemplate from './get-mjml-template'

export enum EmailTemplate {
  SIGNUP = 'signup',
  LOGIN = 'login',
  INVITATION = 'invitation',
  INVITATION_RESPONSE = 'invitation-response',
  REFUND_REQUEST_TICKET = 'refund-request-ticket',
  PURCHASE_SUCCESSFUL = 'purchase-successful',
  SUBSCRIPTION_SUCCESSFUL = 'subscription-successful',
  REFUND_REQUEST_RESPONSE = 'refund-request-response',
  VERIFICATION_REQUEST_RESPONSE = 'verification-request-response',
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

interface InvitationEmailVariables {
  name: string;
  role: string;
  link: string;
  helpEmail?: string;
}

interface InvitationResponseEmailVariables {
  name: string;
  email: string;
  status: string;
  role: string;
  helpEmail?: string;
}

interface RefundRequestTicketEmailVariables {
  name: string;
  from: string;
  to: string;
  date: string;
  refundAmount: string;
  helpEmail?: string;
}

interface PurchaseSuccessfulEmailVariables {
  name: string;
  from: string;
  to: string;
  date: string;
  price: string;
  adults: number;
  children: number;
  seniors: number;
  helpEmail?: string;
}

interface SubscriptionSuccessfulEmailVariables {
  name: string;
  subscriptionTier: string;
  subscriptionType: string;
  expiresAt: string;
  helpEmail?: string;
}

interface RefundRequestResponseEmailVariables {
  name: string;
  status: string;
  statusColor: string;
  from: string;
  to: string;
  date: string;
  refundAmount: string;
  helpEmail?: string;
}

interface VerificationRequestResponseEmailVariables {
  name: string;
  statusColor: string;
  documentUrl: string
  documentVerified: string;
  helpEmail?: string;
}

interface EmailVariablesMap {
  [EmailTemplate.SIGNUP]: SignupEmailVariables;
  [EmailTemplate.LOGIN]: LoginEmailVariables;
  [EmailTemplate.INVITATION]: InvitationEmailVariables;
  [EmailTemplate.INVITATION_RESPONSE]: InvitationResponseEmailVariables;
  [EmailTemplate.REFUND_REQUEST_TICKET]: RefundRequestTicketEmailVariables;
  [EmailTemplate.REFUND_REQUEST_RESPONSE]: RefundRequestResponseEmailVariables;
  [EmailTemplate.VERIFICATION_REQUEST_RESPONSE]: VerificationRequestResponseEmailVariables;
  [EmailTemplate.PURCHASE_SUCCESSFUL]: PurchaseSuccessfulEmailVariables;
  [EmailTemplate.SUBSCRIPTION_SUCCESSFUL]: SubscriptionSuccessfulEmailVariables;
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