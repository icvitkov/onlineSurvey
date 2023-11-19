const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3000

server.use(middlewares)

// send error message when validating code on invest
server.get('/survey', (req, res) => {
  console.log('/invest_url, error 400')
  res.status(500).jsonp({
    errors: [
      {
        title: 'Internal Server Error',
        detail: "Something went wrong. We're working on it!"
      }
    ]
  })
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running on http://localhost:' + port)
})
