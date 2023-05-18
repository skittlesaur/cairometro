import cors, { CorsOptions } from 'cors'

/**
 * This is a custom CORS middleware that allows us to use cookies with CORS
 */
export default cors((req, callback) => {
  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL ?? '',
    credentials: true,
  }

  callback(null, corsOptions)
})
