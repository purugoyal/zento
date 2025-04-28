import axios from 'axios'
import { prisma } from '../lib/prisma'

export async function updatePrice() {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
  )
  const price = res.data.bitcoin.usd
  // You may need a Price model in Prisma to store this
  await prisma.price.create({ data: { currency: 'BTC', value: price } })
}