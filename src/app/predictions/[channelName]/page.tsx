import Link from 'next/link'

const OverlayDefaultPage = async ({
  params,
}: {
  params: Promise<{
    channelName: string
  }>
}) => {
  const { channelName } = await params

  return (
    <h4 className="p-4 text-2xl text-black">
      Go to link{' '}
      <Link
        href={`/predictions/${channelName}/overlay`}
        className="text-purple-600 underline"
      >
        here
      </Link>{' '}
      to see the overlay for {channelName}
    </h4>
  )
}

export default OverlayDefaultPage
