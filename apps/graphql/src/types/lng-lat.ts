import { objectType } from 'nexus'


const LngLatType = objectType({
  name: 'LngLat',
  definition(t) {
    t.float('lng')
    t.float('lat')
  },
})


export default LngLatType