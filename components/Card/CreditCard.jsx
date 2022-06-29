import React, { useState, useRef, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'

import styles from './card.module.scss'
import { Box } from '@mui/material'
import {
  getLength,
  isDisabled,
  reset,
  validation,
} from './../../lib/utils/validation'

const CreditCard = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    amount: '',
  })
  const [cardError, setCardError] = useState({
    cardNumberError: false,
    cvv: false,
    expirationDate: false,
    amount: false,
  })
  const cardNumberRef = useRef(null)
  const cvvRef = useRef(null)
  const expirationDateRef = useRef(null)
  const amountRef = useRef(null)

  const handleInput = (e) => {
    e.preventDefault()
    if (cardError[`${e.target.name}Error`]) {
      setCardError((prev) => ({ ...prev, [`${e.target.name}Error`]: false }))
    }
    setCardInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    console.log(cardInfo)
    reset(cardInfo, setCardInfo)
  }

  const handleBlur = (e) => {
    if (cardInfo[e.target.name].trim()) validation(e, setCardError)
  }

  useEffect(() => {
    cardNumberRef.current.focus()
  }, [])

  useEffect(() => {
    const cardNumberLength = getLength(cardInfo.cardNumber, ' ')

    if (cardNumberLength === 16) {
      cvvRef.current.focus()
    }
  }, [cardInfo.cardNumber])

  useEffect(() => {
    if (cardInfo.cvv.length === 3) {
      expirationDateRef.current.focus()
    }
  }, [cardInfo.cvv])

  useEffect(() => {
    const dateLength = getLength(cardInfo.expirationDate, '/')

    if (dateLength === 6) {
      amountRef.current.focus()
    }
  }, [cardInfo.expirationDate])

  return (
    <div className={styles.wrapper}>
      <Card className={styles.content} sx={{ mb: 1.5 }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} variant='h5' gutterBottom>
            Card Number:
            {cardInfo.cardNumber}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            CVV:
            {cardInfo.cvv}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Expiration Date
            {cardInfo.expirationDate}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mb: 1.5 }}>
        <InputMask
          mask='9999 9999 9999 9999'
          value={cardInfo.cardNumber}
          maskChar=''
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleBlur(e)}>
          {() => (
            <TextField
              id='outlined-basic'
              label='Card Number'
              variant='outlined'
              name='cardNumber'
              inputRef={cardNumberRef}
              error={cardError.cardNumberError}
            />
          )}
        </InputMask>
        <InputMask
          mask='999'
          value={cardInfo.cvv}
          maskChar=''
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleBlur(e)}>
          {() => (
            <TextField
              id='outlined-basic'
              label='CVV'
              variant='outlined'
              name='cvv'
              inputRef={cvvRef}
              error={cardError.cvv}
            />
          )}
        </InputMask>
        <InputMask
          mask='99/9999'
          value={cardInfo.expirationDate}
          maskChar=''
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleBlur(e)}>
          {() => (
            <TextField
              id='outlined-basic'
              label='Expiration Date'
              variant='outlined'
              name='expirationDate'
              inputRef={expirationDateRef}
              error={cardError.expirationDate}
              helperText={cardError.expirationDate && 'Date must be real!'}
            />
          )}
        </InputMask>
      </Box>
      <Box className={styles.sec_content}>
        <TextField
          value={cardInfo.amount}
          id='outlined-basic'
          label='Amount'
          variant='outlined'
          type='text'
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          name='amount'
          inputRef={amountRef}
          onChange={(e) => handleInput(e)}
        />
        <Button
          disabled={isDisabled(cardInfo)}
          variant='contained'
          className={styles.button_buy}
          onClick={handleSubmit}>
          Оплатить
        </Button>
      </Box>
    </div>
  )
}

export default CreditCard
