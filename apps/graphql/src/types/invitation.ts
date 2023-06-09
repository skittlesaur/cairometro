import { objectType } from 'nexus'
import { StaffInvitation } from 'nexus-prisma'

const InvitationType = objectType({
  name: StaffInvitation.$name,
  definition(t) {
    t.field(StaffInvitation.id)
    t.field(StaffInvitation.email)
    t.field(StaffInvitation.name)
    t.field(StaffInvitation.role)
    t.field(StaffInvitation.invitedBy)
    t.field(StaffInvitation.createdAt)
  },
})


export default InvitationType