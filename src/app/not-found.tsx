import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="gap-4 flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <Link href="/" className="text-xl text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  )
}

export default NotFound
