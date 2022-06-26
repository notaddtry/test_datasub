import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import styles from './card.module.scss'
import theme from '../../styles/theme/inputField'
import { ThemeProvider } from '@mui/material'

const CreditCard = () => {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.content}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Card Number
          </Typography>
          <Typography variant='h5' component='div'>
            CVV
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Expiration Date
          </Typography>
        </CardContent>
      </Card>
      <div className={styles.sec_content}>
        <TextField
          id='outlined-basic'
          label='Amount'
          variant='outlined'
          sx={{
            '& .Mui-focused': {
              color: '#45b132',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#45b132',
            },
          }}
        />
        <Button variant='contained' className={styles.button_buy}>
          Оплатить
        </Button>
      </div>
    </div>
  )
}

export default CreditCard
