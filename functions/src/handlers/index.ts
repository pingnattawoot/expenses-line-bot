import * as line from '@line/bot-sdk'
import { replyText } from './utils'

import { handleMessage } from './message'

// callback function to handle a single event
function handleEvent(event: line.WebhookEvent) {
  switch (event.type) {
    case 'message':
      return handleMessage(event)

    case 'follow':
      return replyText(event.replyToken, 'Got followed event')

    case 'unfollow':
      console.log(`Unfollowed this bot: ${JSON.stringify(event)}`)
      return

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`)

    case 'leave':
      console.log(`Left: ${JSON.stringify(event)}`)
      return

    case 'postback':
      const data = event.postback.data
      return replyText(event.replyToken, `Got postback: ${data}`)

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`
      return replyText(
        event.replyToken,
        `${event.beacon.type} beacon hwid : ${
          event.beacon.hwid
        } with device message = ${dm}`
      )

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`)
  }
}

export { handleEvent }
