export class Transaction {
  constructor(
    public id: string,
    public type: TransactionType,
    public purpose: string,
    public amount: number,
    public date: Date,
    public pictureUrl: string,
    public userId: number
  ) {}
}

export enum TransactionType {
    Deposit = "Deposit",
    Withdrawal = "Withdrawal"
}