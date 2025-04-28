// src/pages/api/deposits.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
// import BitcoinCore from 'bitcoin-core'  <-- we’ll skip RPC for now
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const DUMMY_ADDRESS = 'tb1qtestaddress0000000000000000000000000000000'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1) Authenticate
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid auth' })
    return
  }
  let payload: any
  try {
    payload = jwt.verify(auth.split(' ')[1], JWT_SECRET)
  } catch {
    res.status(401).json({ error: 'Invalid token' })
    return
  }
  const userId = payload.userId

  // 2) Handle GET
  if (req.method === 'GET') {
    try {
      // **DEV STUB**: use dummy address instead of RPC
      const address = DUMMY_ADDRESS

      // Save it so that your DB logic still works
      await prisma.deposit.create({
        data: { userId, address, amountBtc: 0, confirmations: 0 }
      })

      res.status(200).json({ address })
    } catch (err: any) {
      console.error('Deposit GET error:', err)
      res.status(500).json({ error: err.message })
    }
    return
  }

  // 3) Disallow other methods
  res.setHeader('Allow', ['GET'])
  res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}
