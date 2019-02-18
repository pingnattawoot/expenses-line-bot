import * as line from '@line/bot-sdk'
import config from '../config'

const client = new line.Client(config)

// simple reply function
export const replyText = (token: string, text: string) => {
  return client.replyMessage(token, { type: 'text', text })
}
