import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { isDisabled, reset, validation } from './../../lib/utils/validation'
import { useEffectFocus } from '../../hooks/useEffectFocus'

import styles from './card.module.scss'

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
  const [isFormSubmitted, setFormSubmitted] = useState(false)
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

  const handleSubmit = async () => {
    setFormSubmitted(() => true)
    const url = '/api/card'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardInfo),
    })
    const data = await res.json()

    window.alert(data.message)
    console.log(data.card)
    reset(cardInfo, setCardInfo)
    setFormSubmitted(() => false)
  }

  const handleBlur = (e) => {
    if (!cardInfo[e.target.name].trim()) {
      setCardError((prev) => ({ ...prev, [e.target.name]: false }))
      return
    }
    if (cardInfo[e.target.name].trim()) validation(e, setCardError)
  }

  useEffectFocus(cardInfo.cardNumber, ' ', 16, expirationDateRef)
  useEffectFocus(cardInfo.expirationDate, '/', 6, cvvRef)
  useEffectFocus(cardInfo.cvv, ' ', 3, amountRef)
  useEffect(() => {
    if (!isFormSubmitted) {
      cardNumberRef.current.focus()
    }
  }, [isFormSubmitted])

  return (
    <>
      {isFormSubmitted && (
        <Box className={styles.loader_wrapper}>
          <CircularProgress />
        </Box>
      )}
      <div className={styles.wrapper}>
        <Card className={`${styles.content}`} sx={{ mb: 1.5 }}>
          <CardContent className={styles.card}>
            <Typography variant='h5' className={styles.card_info_wrapper}>
              Card Number:
              <br />
              <span className={styles.number}>{cardInfo.cardNumber}</span>
            </Typography>
            <Typography>
              Expiration Date:
              <br />
              <span className={styles.date}> {cardInfo.expirationDate}</span>
            </Typography>
            <Typography className={styles.cvv}>
              CVV:
              <br />
              {cardInfo.cvv}
            </Typography>
            <Box className={styles.logo}>
              <Image
                src='/images/image.png'
                width='120'
                height='40'
                layout='fixed'
              />
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ mb: 1.5 }} className={styles.inputs_wrapper}>
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
            Pay
          </Button>
        </Box>
      </div>
    </>
  )
}

export default CreditCard
