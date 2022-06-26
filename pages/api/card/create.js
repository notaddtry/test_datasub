import { connect } from '../../../lib/utils/connect'
import CreditCard from '../../../models/CreditCard.model'

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

    const creditCard = await CreditCard.create(req.body)
    const { _id, amount } = creditCard

    res.json({ responseId: _id, amount })
  }
}
