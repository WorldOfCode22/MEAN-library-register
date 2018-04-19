import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieSession from 'cookie-session'
import UserModel from './models/user'

const LocalStrategy = passportLocal.Strategy

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
    this.app.use(cookieSession({
      name: 'session',
      keys: [dev.cookieKey]
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    passport.use(new LocalStrategy(
      function(username: string, password : string, done : any) {
        UserModel.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (user.password !== password) { return done(null, false); }
          return done(null, user);
        });
      }
    ));
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