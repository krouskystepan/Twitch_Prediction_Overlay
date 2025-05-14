// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      twitchId?: string
      accessToken?: string
    }
  }

  interface User {
    twitchId?: string
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    twitchId?: string
    accessToken?: string
    refreshToken?: string
  }
}
