'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

const AuthButtons = ({ session }: { session: Session | null }) => {
  return session ? (
    <button
      className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
      onClick={() => signOut()}
    >
      Log out
    </button>
  ) : (
    <button
      onClick={() => signIn('twitch')}
      className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
    >
      Login with Twitch
    </button>
  )
}

export default AuthButtons
