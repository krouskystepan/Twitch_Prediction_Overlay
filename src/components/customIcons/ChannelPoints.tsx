const ChannelPoints = ({
  className,
  size,
}: {
  className?: string
  size?: number
}) => {
  return (
    <svg
      width={size || 16}
      height={size || 16}
      viewBox="0 0 11 11"
      className={className}
      fill="currentColor"
    >
      <path
        d="M11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5ZM0.5885 5.5C0.5885 8.21255 2.78745 10.4115 5.5 10.4115C8.21255 10.4115 10.4115 8.21255 10.4115 5.5C10.4115 2.78745 8.21255 0.5885 5.5 0.5885C2.78745 0.5885 0.5885 2.78745 0.5885 5.5Z"
        stroke="currentColor"
        strokeWidth={0.25}
      />
      <path
        d="M9.51052 4.53494C9.27927 3.57393 8.71063 2.72791 7.9081 2.15087L7.65043 2.50923C8.36709 3.02452 8.87489 3.78002 9.0814 4.6382L9.51052 4.53494Z"
        stroke="currentColor"
        strokeWidth={0.1}
      />
    </svg>
  )
}

export default ChannelPoints
