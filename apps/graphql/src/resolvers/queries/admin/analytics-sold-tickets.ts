import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsSoldTickets: FieldResolver<'Query', 'analyticsSoldTickets'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)

    // @todo: implement
    return 1230
  }

export default analyticsSoldTickets