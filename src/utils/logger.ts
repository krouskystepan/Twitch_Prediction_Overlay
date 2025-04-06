type LogType = 'info' | 'success' | 'warn' | 'error'

const colors: Record<LogType, string> = {
  info: '\x1b[34m',
  success: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
}

const labels: Record<LogType, string> = {
  info: 'INFO',
  success: 'SUCCESS',
  warn: 'WARN',
  error: 'ERROR',
}

const getTimestamp = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

const log = (type: LogType, message: string, ...optionalParams: any[]) => {
  const color = colors[type]
  const label = labels[type]
  const timestamp = getTimestamp()
  const reset = '\x1b[0m'

  const formatted = `${color}${timestamp} - [${label}]: ${reset}${message}`

  const logger =
    type === 'error'
      ? console.error
      : type === 'warn'
      ? console.warn
      : console.log

  logger(formatted, ...optionalParams)
}

export const logInfo = (message: string, ...params: any[]) =>
  log('info', message, ...params)
export const logSuccess = (message: string, ...params: any[]) =>
  log('success', message, ...params)
export const logWarn = (message: string, ...params: any[]) =>
  log('warn', message, ...params)
export const logError = (message: string, ...params: any[]) =>
  log('error', message, ...params)
