import { Schema, model, models } from 'mongoose'

const cardSchema = new Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
})

const CreditCard = models.CreditCard || model('CreditCard', cardSchema)

export default CreditCard
