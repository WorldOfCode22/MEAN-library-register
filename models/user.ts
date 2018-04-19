import mongoose from 'mongoose'

const user = new mongoose.Schema({
  username: String,
  password: String,
  role: String
})

export default mongoose.model('user', user)