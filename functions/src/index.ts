import * as functions from 'firebase-functions'
import * as express from 'express'
import * as line from '@line/bot-sdk'
import config from './config'
import * as database from './database'

import { handleEvent } from './handlers'

const app = express()
database.initializeDatabase()

app.get('/webhook', (req, res) => {
  res.send('OK!')
})

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log('event', JSON.stringify(req.body, null, 4))

  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    res.status(500).end()
    return
  }

  // handle events separately
  Promise.all(
    req.body.events.map(event => {
      console.log('event', event)
      // check verify webhook event
      if (
        event.replyToken === '00000000000000000000000000000000' ||
        event.replyToken === 'ffffffffffffffffffffffffffffffff'
      ) {
        return null
      }
      return handleEvent(event)
    })
  )
    .then(() => res.end())
    .catch(err => {
      console.error(err)
      res.status(500).end()
    })
})

export const api = functions.https.onRequest(app)
