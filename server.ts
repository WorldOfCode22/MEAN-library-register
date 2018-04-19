import express from 'express'
import dotenv from 'dotenv'
class Server {
  public app: express.Application
  private port: number = 3000
  constructor(){
    this.app = express()
    this.config()
    this.routes()
  }

  public config(){
    dotenv.config()
    // middleware
  }

  public routes(){
    let router = express.Router()

    router.get('/ping', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send({test: 'Server is working'})
    })
    this.app.use('/api', router)
  }
}

export default new Server().app