export class Transaction {
  constructor(
    public transactionId: number,
    public type: TransactionType,
    public purpose: string,
    public amount: number,
    public date: Date,
    public imageUrl: string,
    public userId: number,
  ) {}
}

export enum TransactionType {
    Deposit = "Deposit",
    Withdrawal = "Withdrawal"
}