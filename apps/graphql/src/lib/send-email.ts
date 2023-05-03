import mjml2html from 'mjml';
import sgMail from '@sendgrid/mail';

const apiKey = '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';
sgMail.setApiKey(apiKey);

type EmailTemplate = 'AUTHENTICATION' | 'TICKET_UPDATE';

type Variables = {
  [key: string]: string;
};

const sendEmail = async (recipient: string, template: EmailTemplate, variables?: Variables) => {
const mjmlTemplate = `<mjml>
                    <mj-body>
                    <mj-section>
                        <mj-column>

                        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

                        <mj-divider border-color="#F45E43"></mj-divider>

                        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello ${variables!.name}</mj-text>
                        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Your email is ${variables!.email}</mj-text>

                        </mj-column>
                    </mj-section>
                    </mj-body>
                    </mjml>`;

const { html } = mjml2html(mjmlTemplate);

const message = {
    to: recipient,
    from: 'youssef2311@gmail.com',
    subject: template,
    html: html
}
sgMail.send(message).then(() => console.log('email has been sent.')).catch((err: { message: any; }) => console.log(err.message));
}

export default sendEmail;