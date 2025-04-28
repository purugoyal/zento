import { prisma } from '../lib/prisma'
import { getConfirmations } from '../lib/bitcoin'

export async function calculateLTV(userId: string) {
  const deposits = await prisma.deposit.findMany({ where: { userId } })
  const btc = deposits
    .filter(d => d.confirmations >= 1)
    .reduce((sum, d) => sum + d.amountBtc, 0)

  const price = await getPrice()
  const collateralValue = btc * price

  const loans = await prisma.loan.findMany({ where: { userId, status: 'OPEN' } })
  const principal = loans.reduce((sum, l) => sum + l.principalUsd, 0)

  return principal / collateralValue
}

async function getPrice() {
  // Placeholder: call an oracle or CoinGecko
  return 40000
}