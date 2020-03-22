import express from 'express'

let app = require('./server').default

const PORT = process.env.PORT || 3000

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('> HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('> Server-side HMR Enabled!')
}

let exp = express()
  .use((req, res) => app.handle(req, res))
  .listen(PORT, function(err) {
    if (err) {
      console.error(err)
      return
    }
    console.log(`> Started on http://localhost:${PORT}`)
  })

export default exp
