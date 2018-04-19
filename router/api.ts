import express from 'express'
import UserModel from '../models/user'
import databaseHelpers from '../lib/helpers/database-helpers'

let apiRouter = express.Router()

apiRouter.post('/user', async (req, res) => {
  try {
    let username : string = req.body.username
    let password : string = req.body.password
    let createdUser : any
    let user = await databaseHelpers.findUserByUsername(username)
    if (user) res.json({error: 'Username already taken'})
    else createdUser = await databaseHelpers.createNewUser(username, password)
    res.json(createdUser)
  } catch (e) {
    res.json({error: e})
  }
})

export default apiRouter