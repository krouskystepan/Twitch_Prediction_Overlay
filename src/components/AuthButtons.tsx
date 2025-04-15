'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

import { Button } from './ui/button'

const AuthButtons = ({ session }: { session: Session | null }) => {
  return session ? (
    <Button
      onClick={() => signOut()}
      variant="destructive"
      size="lg"
      className="py-4 text-base font-semibold"
    >
      Log out
    </Button>
  ) : (
    <Button
      onClick={() => signIn('twitch')}
      variant="twitch"
      size="lg"
      className="py-4 text-base font-semibold"
    >
      Login with Twitch
    </Button>
  )
}

export default AuthButtons
