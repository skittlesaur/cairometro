import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsAverageCustomerSupportResponse: FieldResolver<'Query', 'analyticsAverageCustomerSupportResponse'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)

    // @todo: implement
    const hours = 12
    const minutes = 30

    return hours * 60 + minutes
  }

export default analyticsAverageCustomerSupportResponse