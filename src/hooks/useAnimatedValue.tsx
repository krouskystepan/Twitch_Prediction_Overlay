import { useEffect, useState } from 'react'
import { animate, KeyframeOptions } from 'framer-motion'

const useAnimatedValue = (
  target: number,
  duration = 0.5,
  delay = 0.5,
  ease: KeyframeOptions['ease'] = 'linear'
) => {
  const [value, setValue] = useState(target)

  useEffect(() => {
    const control = animate(value, target, {
      duration,
      delay,
      ease,
      onUpdate: (v) => setValue(v),
    })
    return () => control.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delay])

  return value
}

export default useAnimatedValue
