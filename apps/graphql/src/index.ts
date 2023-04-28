import express from 'express'

import * as bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import cors from './utils/cors'
import yoga from './utils/yoga'

const PORT = process.env.PORT ?? 1111

const app = express()

app.use(cors)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/graphql', yoga)

// app.get('/ping', (_, res: Response) => {
//   res.status(200).send('pong')
// })

app.listen(PORT, () => {
  console.log(`GraphQL Server is listening on port ${PORT}`)
})

export default app