import * as line from '@line/bot-sdk'
import { replyText } from './utils'
import * as moment from 'moment'

function handleText(message: line.TextMessage, replyToken: string) {
  const dateNow = moment()
    .utcOffset(7)
    .format('dddd, MMMM Do YYYY, h:mm:ss a')
  const replyMessage = `${message.text} \n-------------------\n${dateNow}`

  return replyText(replyToken, replyMessage)
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

export const handleMessage = (event: line.WebhookEvent) => {
  if (event.type === 'message') {
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
  } else {
    throw new Error('This is not a message')
  }
}
