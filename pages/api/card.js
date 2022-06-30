import { connect } from '../../lib/utils/connect'
import CreditCard from '../../models/CreditCard.model'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.json('hello,datasub')
  }
  if (req.method === 'POST') {
    await connect()
    try {
      const { cardNumber } = req.body
      const existingCard = await CreditCard.findOne({ cardNumber })

      if (existingCard) {
        return res.json({
          message: 'Такая карта уже существует!',
          card: existingCard,
        })
      }

      const creditCard = await CreditCard.create(req.body)
      const { _id, amount } = creditCard

      res.json({ responseId: _id, amount })
    } catch {
      res.status(500).json('Такая карта уже существует!')
    }
  }
}
