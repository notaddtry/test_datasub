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
      const cardInDb = await CreditCard.findOne({ cardNumber })

      if (cardInDb) {
        return res.json({
          message: 'Такая карта уже существует!',
          card: cardInDb,
        })
      }

      const creditCard = await CreditCard.create(req.body)
      const { _id, amount } = creditCard

      res.json({
        message: 'Карта успешно добавлена!',
        card: { responseId: _id, amount },
      })
    } catch {
      res.json('Ошибка связи сервера с БД')
    }
  }
}
