import { createYoga } from 'graphql-yoga'

import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { useCookies } from '@whatwg-node/server-plugin-cookies'

import { createContext } from '../context'

import { isDev } from './is-dev'
import schema from './schema'


const yoga = createYoga({
  schema,
  context: async (initialContext) => await createContext(initialContext),
  graphiql: isDev,
  plugins: [
    useCookies(),
    useDisableIntrospection({
      isDisabled: (request) =>{
        const isIntrospectionSecretPresent = request.headers.get('x-allow-introspection') === process.env.introspectionSecret
        return isDev || isIntrospectionSecretPresent
      },
    }),
  ],
})

export default yoga