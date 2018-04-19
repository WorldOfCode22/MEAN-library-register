import UserModel from '../../models/user'

let databaseHelpers = {
  findUserByUsername: async (username: string) : Promise<any> => {
    return new Promise<any>((resolve, reject) : any => {
      UserModel.findOne({username}, (err, doc) => {
        if (err) reject(new Error('Could not fetch user collection'))
        else if (doc) resolve(doc)
        else resolve (null)
      })
    })
  },

  findUserById: async (id: string) => {
    return new Promise<any>((resolve, reject) => {
      UserModel.findById(id, (err, doc) => {
        if (err) reject (new Error('Could not fetch user collection'))
        else if (doc) resolve(doc)
        else resolve(null)
      })
    })
  },
  
  createNewUser: async (username: string, password: string) => {
    return new Promise<any>((resolve, reject) => {
      let newUser = new UserModel({username, password})
      newUser.save((err, doc)=>{
        if (err) reject (new Error('Error saving file'))
        else resolve(doc)
      })
    })
  }
}

export default databaseHelpers
