import { useEffect } from 'react'
import { getLength } from '../lib/utils/validation'

export const useEffectFocus = (propToCheck, howToCheck, checkLength, ref) => {
  const originalLength = getLength(propToCheck, howToCheck)

  return useEffect(() => {
    if (originalLength === checkLength) {
      ref.current.focus()
    }
  }, [propToCheck])
}
