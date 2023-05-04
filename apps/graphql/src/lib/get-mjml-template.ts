import mjmlAuthTemplate from "../notifications/authentication-template";
import mjmlTicketUpdateTemplate from "../notifications/ticket-update-template";

type Variables = {
    [key: string]: string;
  };


const getMjmlTemplate = (template: string, variables: Variables) => {
    if(template === 'AUTHENTICATION'){
        return (mjmlAuthTemplate(variables))
    }
    if(template == 'TICKET_UPDATE'){
        return (mjmlTicketUpdateTemplate(variables))
    }
   }

   export default getMjmlTemplate