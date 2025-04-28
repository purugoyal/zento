import BitcoinCore from 'bitcoin-core'
export const client = new BitcoinCore({
  username: process.env.RPC_USER,
  password: process.env.RPC_PASS,
  host: process.env.BITCOIN_RPC_HOST,
  port: parseInt(process.env.BITCOIN_RPC_PORT!),
})

export async function getConfirmations(txid: string) {
  const tx = await client.getTransaction(txid)
  return tx.confirmations
}