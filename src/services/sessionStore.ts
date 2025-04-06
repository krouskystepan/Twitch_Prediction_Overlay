type SessionData = {
  token: string
  broadcasterId: string
}

const userSessions = new Map<string, SessionData>()

export const setUserSession = (username: string, data: SessionData) => {
  userSessions.set(username.toLowerCase(), data)
}

export const getUserSession = (username: string): SessionData | undefined => {
  return userSessions.get(username.toLowerCase())
}
