import mongoose from 'mongoose'

export const connect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('connected success')
    })
    .catch((e) => {
      console.log('connection lost:', e)
    })
}
