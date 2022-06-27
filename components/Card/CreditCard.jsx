import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import styles from './card.module.scss'

const CreditCard = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '****************',
    cvv: '',
    expirationDate: '',
    amount: '',
  })

  const handleInput = (e) => {
    e.preventDefault()

    setCardInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.content}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Card Number:
            {cardInfo.cardNumber}
          </Typography>
          <Typography variant='h5' component='div'>
            CVV:
            {cardInfo.cvv}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Expiration Date
            {cardInfo.expirationDate}
          </Typography>
        </CardContent>
      </Card>
      <TextField
        id='outlined-basic'
        label='Card Number'
        variant='outlined'
        name='cardNumber'
        onChange={(e) => handleInput(e)}
      />
      <TextField
        id='outlined-basic'
        label='CVV'
        variant='outlined'
        name='cvv'
        onChange={(e) => handleInput(e)}
      />
      <TextField
        id='outlined-basic'
        label='Expiration Date'
        variant='outlined'
        name='expirationDate'
        onChange={(e) => handleInput(e)}
      />
      <div className={styles.sec_content}>
        <TextField
          id='outlined-basic'
          label='Amount'
          variant='outlined'
          name='amount'
          onChange={(e) => handleInput(e)}
        />
        <Button variant='contained' className={styles.button_buy}>
          Оплатить
        </Button>
      </div>
    </div>
  )
}

export default CreditCard
