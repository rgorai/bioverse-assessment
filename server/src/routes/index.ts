import { Express, Router } from 'express'
import ticketsRouter from './tickets'

const routers: {
  route: string
  router: Router
}[] = [{ route: 'tickets', router: ticketsRouter }]

const configRoutes = (app: Express) => {
  for (const e of routers) app.use(`/api/${e.route}`, e.router)
}

export default configRoutes
