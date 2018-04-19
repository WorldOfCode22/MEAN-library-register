import Server from './server'
import http from 'http'

const server = http.createServer(Server)
server.listen(3000, () => {
  console.log('app running on port ' + '3000')
})