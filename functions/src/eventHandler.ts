import * as line from '@line/bot-sdk'
import config from './config'

const client = new line.Client(config.lineSecret)

// simple reply function
const replyText = (token: string, text: string) => {
  return client.replyMessage(token, { type: 'text', text })
}

// callback function to handle a single event
function handleEvent(event: line.WebhookEvent) {
  switch (event.type) {
    case 'message':
      const message = event.message
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken)
        case 'image':
          return handleImage(message, event.replyToken)
        case 'video':
          return handleVideo(message, event.replyToken)
        case 'audio':
          return handleAudio(message, event.replyToken)
        case 'location':
          return handleLocation(message, event.replyToken)
        case 'sticker':
          return handleSticker(message, event.replyToken)
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`)
      }

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

function handleText(message: line.TextMessage, replyToken: string) {
  return replyText(replyToken, message.text)
}

function handleImage(message: line.ImageEventMessage, replyToken: string) {
  return replyText(replyToken, 'Got Image')
}

function handleVideo(message: line.VideoEventMessage, replyToken: string) {
  return replyText(replyToken, 'Got Video')
}

function handleAudio(message: line.AudioEventMessage, replyToken: string) {
  return replyText(replyToken, 'Got Audio')
}

function handleLocation(message: line.LocationMessage, replyToken: string) {
  return replyText(replyToken, 'Got Location')
}

function handleSticker(message: line.StickerMessage, replyToken: string) {
  return replyText(replyToken, 'Got Sticker')
}

export { handleEvent }
