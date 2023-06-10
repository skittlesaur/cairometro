import { FieldResolver } from 'nexus'

import adminPermission from '../../permissions/admin'
import sendEmail from '../../lib/send-email'
import { EmailTemplate } from '../../lib/send-email'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'


const updateVerificationStatus: FieldResolver< 'Mutation', 'updateVerificationStatus' > = async(_, args, ctx)=>{
  adminPermission(ctx)

  const { prisma } = ctx
  var statusColor = 'green'
  if(args.documentVerified.verificationstatus == 'REJECTED') statusColor = 'red'
  const user = await prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      documentVerified: args.documentVerified.verificationstatus,
    },
  })
  await sendEmail<EmailTemplate.VERIFICATION_REQUEST_RESPONSE>(user.email, 'Account Verifications', EmailTemplate.VERIFICATION_REQUEST_RESPONSE, {
    name: user.name,
    documentVerified: capitalizeFirstLetters(args.documentVerified.verificationstatus),
    documentUrl: user.documentUrl,
    statusColor: statusColor
  })

  return true
}

export default updateVerificationStatus