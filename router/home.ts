import express from 'express'
import UserModel from '../models/user'
import databaseHelpers from '../lib/helpers/database-helpers'

let homeRouter = express.Router()

homeRouter.post('/register', async (req, res) => {
  try {
    let username : string = req.body.username
    let password : string = req.body.password
    let createdUser : any
    let user = await databaseHelpers.findUserByUsername(username)
    if (user) res.json({error: 'Username already taken'})
    else createdUser = await databaseHelpers.createNewUser(username, password)
    res.json({message: 'User Registered'})
  } catch (e) {
    res.json({error: e})
  }
})

export default homeRouter