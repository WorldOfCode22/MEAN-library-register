import express from 'express'
import mongoose, { Document } from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieSession from 'cookie-session'
import UserModel from './models/user'
import homeRouter from './router/home'
import bodyParser from 'body-parser'

const LocalStrategy = passportLocal.Strategy

import {dev} from './.config/env' 
import databaseHelpers from './lib/helpers/database-helpers';
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
    this.app.use(bodyParser.urlencoded({ extended: true }))
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

    passport.serializeUser(function(user : Document, done) {
      done(null, user.id);
    });

    passport.deserializeUser( async (id: string, done)=>{
      try {
        let user = await databaseHelpers.findUserById(id)
        done(null, user)
      } catch (e) {
        done(e)
      }
    })
  }

  public routes(){
    this.app.use('/', homeRouter)
  }
}

export default new Server().app