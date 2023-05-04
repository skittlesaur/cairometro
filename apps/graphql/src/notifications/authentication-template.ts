

type Variables = {
  [key: string]: string;
};

const mjmlAuthTemplate = (variables: Variables) => `<mjml>
<mj-body>
<mj-section>
    <mj-column>

    <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

    <mj-divider border-color="#F45E43"></mj-divider>

    <mj-text font-size="25px" color="#F45E43" font-family="helvetica">Authentication</mj-text>
    <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello ${variables!.name}</mj-text>
    <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Your email is ${variables!.email}</mj-text>

    </mj-column>
</mj-section>
</mj-body>
</mjml>`

export default mjmlAuthTemplate