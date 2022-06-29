export const validation = (str, setError) => {
  switch (str.target.name) {
    case 'cardNumber':
      const cardLength = getLength(str.target.value, ' ')

      if (cardLength === 16) {
        setError((prev) => ({ ...prev, cardNumberError: false }))
        return
      }
      setError((prev) => ({ ...prev, cardNumberError: true }))

      break
    case 'cvv':
      if (str.target.value.length === 3) {
        setError((prev) => ({ ...prev, cvv: false }))
        return
      }
      setError((prev) => ({ ...prev, cvv: true }))
      break
    case 'expirationDate':
      const regex = /(0[1-9]|1[0-2])\/20[0-9]{2}$/
      const dateLength = getLength(str.target.value, '/')

      if (dateLength === 6 && regex.test(str.target.value)) {
        setError((prev) => ({ ...prev, expirationDate: false }))
        return
      }
      setError((prev) => ({ ...prev, expirationDate: true }))
      break
    default:
      break
  }
}

export const isDisabled = (state) => {
  const cardLength = getLength(state.cardNumber, ' ')
  const cvvLength = getLength(state.cvv)
  const dateLength = getLength(state.expirationDate, '/')
  const regex = /(0[1-9]|1[0-2])\/20[0-9]{2}$/

  if (
    cardLength === 16 &&
    cvvLength === 3 &&
    dateLength === 6 &&
    regex.test(state.expirationDate) &&
    state.amount !== ''
  ) {
    return false
  }
  return true
}

export const getLength = (props, by = '') => {
  return props.split(by).join('').length
}

export const reset = (obj, setDefault, setReady) => {
  const defaultObj = {}

  Object.keys(obj).map((key) => {
    defaultObj[key] = ''
  })

  setDefault(defaultObj)
  setReady(() => true)
}
