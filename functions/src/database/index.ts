import * as admin from 'firebase-admin'
import { dbConfig } from '../config'

let database = null

const initializeDatabase = () => {
  admin.initializeApp(dbConfig)
  database = admin.database()
}

const getDatabase = () => {
  if (!database) {
    initializeDatabase()
  }
  return database
}

export { initializeDatabase, getDatabase }
