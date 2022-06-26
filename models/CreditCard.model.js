import { Schema, model, models } from 'mongoose'

const cardSchema = new Schema({
  cardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  expirationDate: {
    type: Number,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
})

const CreditCard = models.CreditCard || model('CreditCard', cardSchema)

export default CreditCard
