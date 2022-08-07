export class Transaction {
  constructor(
    public transactionId: number | null,
    public type: TransactionType,
    public monthYear: string,
    public totalAmount: number,
    public userId: number,
    public transactionItems: TransactionItem[]
  ) {}
}

export class TransactionItem {
  constructor(
    public transactionItemId: number | null,
    public date: Date,
    public amount: number,
    public imageUrl: string,
    public purpose: Purpose
  ) {}
}

export class Purpose {
  constructor(
    public purposeId: number,
    public name?: string,
    public itemCategory?: ItemCategory
  ) {}
}

export class ItemCategory {
  constructor(
    public itemCategoryId: number,
    public name: CategoryName
  ) {}
}


export enum TransactionType {
    Deposit = "Deposit",
    Withdrawal = "Withdrawal"
}

export enum CategoryName {
  PersonalIncome = "PersonalIncome",
  BusinessIncome = "BusinessIncome",
  PersonalExpense = "PersonalExpense",
  BusinessExpense = "BusinessExpense"
}