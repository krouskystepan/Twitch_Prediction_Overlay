const InfoLine = ({
  icon,
  text,
  isLeft,
}: {
  icon: React.ReactNode
  text: string | number
  isLeft: boolean
}) => {
  return (
    <p className="inline-flex items-center gap-1 text-xs font-semibold">
      {isLeft ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </p>
  )
}

export default InfoLine
