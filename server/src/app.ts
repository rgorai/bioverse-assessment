import path from 'path'
import express from 'express'
import cors from 'cors'
import configRoutes from './routes/index'
import { NODE_ENV, PORT } from './utils/env'

const port = PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

if (NODE_ENV === 'production') {
  app.use(express.static(path.resolve('nummle-ui', 'build')))
  app.get('*', (_, res) => {
    res.sendFile(path.resolve('nummle-ui', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
