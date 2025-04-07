import { NextResponse } from 'next/server'

export async function GET() {
  const authorizationUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&scope=channel:read:predictions`
  return NextResponse.redirect(authorizationUrl)
}
