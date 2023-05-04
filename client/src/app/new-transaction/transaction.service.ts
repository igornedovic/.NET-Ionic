import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SmsManager } from '@byteowls/capacitor-sms';

import { AuthService } from '../auth/auth.service';
import { Transaction, TransactionItem } from './transaction.model';
import { TransactionType } from './transaction.model';

interface TransactionData {
  transactionId: number;
  type: TransactionType;
  monthYear: string;
  totalAmount: number;
  userId: number;
  transactionItems: TransactionItem[];
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = environment.apiUrl;
  private _transactions = new BehaviorSubject<Transaction[]>([]);
  private _balance = new BehaviorSubject<number>(0);
  private smsText = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  get transactions() {
    return this._transactions.asObservable();
  }

  get balance() {
    return this._balance.asObservable();
  }

  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'tnzfsbju');

    return this.http.post<{ url: string }>(
      'https://api.cloudinary.com/v1_1/dosbawfen/image/upload',
      formData
    );
  }

  addTransaction(
    transactionData: TransactionData,
    addedTransactionItems: TransactionItem[]
  ) {
    let fetchedUserId: number;
    let newTransaction: Transaction;
    let generatedId: number;

    return this.authService.userId.pipe(
      take(1),
      tap((userId) => {
        fetchedUserId = userId;
      }),
      take(1),
      switchMap(() => {
        newTransaction = new Transaction(
          null,
          transactionData.type,
          transactionData.monthYear,
          +transactionData.totalAmount,
          fetchedUserId,
          addedTransactionItems
        );

        this.smsText += `New transaction registred for ${newTransaction.monthYear}: `;

        if (newTransaction.type === TransactionType.Deposit) {
          this.smsText += `+ ${newTransaction.totalAmount} RSD\n`;
        } else {
          this.smsText += `- ${newTransaction.totalAmount} RSD\n`;
        }

        return this.http.post<TransactionData>(this.apiUrl + 'transaction', {
          type: newTransaction.type.toString(),
          monthYear: newTransaction.monthYear,
          totalAmount: newTransaction.totalAmount,
          userId: newTransaction.userId,
          transactionItems: newTransaction.transactionItems.map((ti) => {
            return {
              date: ti.date,
              amount: ti.amount,
              imageUrl: ti.imageUrl,
              purposeId: ti.purpose.purposeId,
            };
          }),
        });
      }),
      take(1),
      switchMap((response) => {
        generatedId = response.transactionId;
        return this.transactions;
      }),
      take(1),
      tap((transations) => {
        newTransaction.transactionId = generatedId;
        const newTransactions = transations.concat(newTransaction);
        this._transactions.next(newTransactions);
        this.changeBalance(newTransactions);
      })
    );
  }

  getTransactions() {
    let fetchedUserId: number;

    return this.authService.userId.pipe(
      take(1),
      tap((userId) => {
        fetchedUserId = userId;
      }),
      take(1),
      switchMap(() => {
        return this.http.post<TransactionData[]>(
          this.apiUrl + `user/${fetchedUserId}/transactions`,
          {}
        );
      }),
      map((transactionsResponse) => {
        const transactions: Transaction[] = [];

        transactionsResponse.forEach((t) => {
          transactions.push(
            new Transaction(
              t.transactionId,
              t.type,
              t.monthYear,
              t.totalAmount,
              t.userId,
              t.transactionItems
            )
          );
        });

        return transactions;
      }),
      tap((transactions) => {
        this._transactions.next(transactions);
        this.changeBalance(transactions);
      })
    );
  }

  getTransaction(id: number) {
    let fetchedUserId: number;

    return this.authService.userId.pipe(
      take(1),
      tap((userId) => {
        fetchedUserId = userId;
      }),
      take(1),
      switchMap(() => {
        return this.http.post<TransactionData>(
          this.apiUrl + `user/${fetchedUserId}/transactions/${id}`,
          {}
        );
      }),
      map((transactionsResponse) => {
        return new Transaction(
          transactionsResponse.transactionId,
          transactionsResponse.type,
          transactionsResponse.monthYear,
          transactionsResponse.totalAmount,
          transactionsResponse.userId,
          transactionsResponse.transactionItems
        );
      })
    );
  }

  getFilteredTransactions(
    fromDate: string,
    toDate: string,
    minAmount: number,
    maxAmount: number
  ) {
    let fetchedUserId: number;

    return this.authService.userId.pipe(
      take(1),
      tap((userId) => {
        fetchedUserId = userId;
      }),
      take(1),
      switchMap(() => {
        return this.http.post<TransactionData[]>(
          this.apiUrl +
            `user/${fetchedUserId}/transactionItemsToFilter?fromDate=${fromDate}&toDate=${toDate}&minAmount=${minAmount}&maxAmount=${maxAmount}`,
          {}
        );
      }),
      map((transactionResponse) => {
        const transactionItems: TransactionItem[] = [];

        transactionResponse.forEach((t) => {
          t.transactionItems.forEach((ti) => {
            transactionItems.push(
              new TransactionItem(
                ti.transactionItemId,
                ti.date,
                ti.amount,
                ti.imageUrl,
                ti.purpose
              )
            );
          });
        });

        return transactionItems;
      })
    );
  }

  updateTransaction(
    id: number,
    transactionData: TransactionData,
    addedTransactionItems: TransactionItem[]
  ) {
    let updatedTransactions: Transaction[];
    return this.transactions.pipe(
      take(1),
      switchMap((transactions) => {
        if (!transactions || transactions.length <= 0) {
          return this.getTransactions();
        } else {
          return of(transactions);
        }
      }),
      switchMap((transactions) => {
        const updatedTransactionIndex = transactions.findIndex(
          (pl) => pl.transactionId === id
        );
        updatedTransactions = [...transactions];
        const oldTransaction = updatedTransactions[updatedTransactionIndex];
        updatedTransactions[updatedTransactionIndex] = new Transaction(
          id,
          transactionData.type,
          transactionData.monthYear,
          +transactionData.totalAmount,
          oldTransaction.userId,
          addedTransactionItems
        );
        return this.http.put(
          this.apiUrl + `transaction/${id}`,
          {
            type: updatedTransactions[updatedTransactionIndex].type.toString(),
            monthYear: updatedTransactions[updatedTransactionIndex].monthYear,
            totalAmount:
              updatedTransactions[updatedTransactionIndex].totalAmount,
            userId: updatedTransactions[updatedTransactionIndex].userId,
            transactionItems: updatedTransactions[
              updatedTransactionIndex
            ].transactionItems.map((ti) => {
              return {
                date: ti.date,
                amount: ti.amount,
                imageUrl: ti.imageUrl,
                purposeId: ti.purpose.purposeId,
              };
            }),
          },
          { responseType: 'text' }
        );
      }),
      tap((response) => {
        this._transactions.next(updatedTransactions);
        this.changeBalance(updatedTransactions);
        return response;
      })
    );
  }

  deleteTransaction(id: number) {
    let newTransactions: Transaction[];

    return this.transactions.pipe(
      take(1),
      switchMap((transactions) => {
        newTransactions = transactions.filter((t) => t.transactionId !== id);

        return this.http.delete(this.apiUrl + `transaction/${id}`, {
          responseType: 'text',
        });
      }),
      tap((response) => {
        console.log(response);
        this._transactions.next(newTransactions);
        this.changeBalance(newTransactions);
      })
    );
  }

  changeBalance(transactions: Transaction[]) {
    let newBalance = 0;
    transactions.forEach((t) => {
      if (t.type === TransactionType.Deposit) {
        newBalance += t.transactionItems.reduce(
          (previous, current) => previous + current.amount,
          0
        );
      } else {
        newBalance -= t.transactionItems.reduce(
          (previous, current) => previous + current.amount,
          0
        );
      }
    });

    this.smsText += '-------------------------------------------------\n';
    this.smsText += `New balance: ${newBalance.toFixed(2)} RSD\n`;
    this.smsText += '-------------------------------------------------\n';

    const numbers: string[] = ['+381656132006'];
    SmsManager.send({
      numbers: numbers,
      text: this.smsText,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.smsText = '';
    this._balance.next(newBalance);
  }
}
