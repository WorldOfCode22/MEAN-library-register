import express from 'express'
import mongoose from 'mongoose'
import {dev} from './.config/env' 
class Server {
  public app: express.Application
  private port: number = 3000
  constructor(){
    this.app = express()
    this.config()
    this.routes()
  }

  public config(){
    mongoose.connect(dev.mongoURL)
    .then(() => { console.log('Database Connected') })
    .catch((err) => { console.log('Database Connection Error: ' + err)})
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