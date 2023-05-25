import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import findRoute from '../../lib/find-route'

const getPrice: FieldResolver<'Query', 'getPrice'> =
  async (_, args, ctx: Context) => {
    const { from, to, passengers } = args
    
    const path = await findRoute(from, to, ctx)
    const price = await calculatePricing(path, passengers, ctx)

    return price
  }

export default getPrice
