export interface Deposit {
    id: string
    address: string
    amountBtc: number
    confirmations: number
  }
  
  export interface Loan {
    id: string
    principalUsd: number
    collateralBtc: number
    status: string
  }