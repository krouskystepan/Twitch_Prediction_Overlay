import { AuthOptions } from 'next-auth'
import TwitchProvider from 'next-auth/providers/twitch'

export const authOptions: AuthOptions = {
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      authorization: {
        params: {
          response_type: 'code',
          client_id: process.env.TWITCH_CLIENT_ID,
          redirect_uri: process.env.TWITCH_REDIRECT_URI,
          scope: 'openid user:read:email channel:read:predictions',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.twitchId = profile.sub
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.twitchId = token.twitchId
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
}
