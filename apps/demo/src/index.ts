import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'

import { createMessage } from './message.js'

const envFile = '.env.local'

if (existsSync(envFile)) {
  loadEnvFile(envFile)
}

const prefix = process.env.DEMO_PREFIX ?? ''

process.stdout.write(`${prefix}${createMessage()}\n`)
