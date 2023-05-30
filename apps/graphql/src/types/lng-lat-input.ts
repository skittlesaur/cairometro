import { inputObjectType } from 'nexus'

const LngLatInputType = inputObjectType({
  name: 'LngLatInput',
  definition(t) {
    t.float('lng')
    t.float('lat')
  },
})

export default LngLatInputType