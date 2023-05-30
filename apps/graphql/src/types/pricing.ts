import { objectType } from 'nexus'
import { Pricing } from 'nexus-prisma'


const PricingType = objectType({
  name: Pricing.$name,
  definition(t) {
    t.field(Pricing.id)
    t.field(Pricing.priceZoneOne)
    t.field(Pricing.priceZoneOneSeniors)
    t.field(Pricing.priceZoneTwo)
    t.field(Pricing.priceZoneTwoSeniors)
    t.field(Pricing.priceZoneThree)
    t.field(Pricing.priceZoneThreeSeniors)
  },
})


export default PricingType