import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const APP_TILE = 'Puffalo'
export const APP_ICO_FOLDER = path.join(__dirname, '../../assets/icons/ico')
export const APP_ICO = path.join(APP_ICO_FOLDER, 'logo.ico')
