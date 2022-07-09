import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../auth/auth.service';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction.model';

interface TransactionData {
  transactionId: number;
  type: TransactionType;
  purpose: string;
  amount: number;
  date: Date;
  imageUrl: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = environment.apiUrl;
  private _transactions = new BehaviorSubject<Transaction[]>([]);
  private _balance = new BehaviorSubject<number>(0);

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

  addTransaction(transactionData: TransactionData, imageUrl: string) {
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
          transactionData.purpose,
          +transactionData.amount,
          new Date(transactionData.date),
          imageUrl,
          fetchedUserId
        );

        return this.http.post<TransactionData>(this.apiUrl + 'transaction', {
          purpose: newTransaction.purpose,
          type: newTransaction.type.toString(),
          date: newTransaction.date.toISOString().slice(0, 10),
          amount: newTransaction.amount,
          imageUrl: newTransaction.imageUrl,
          userId: newTransaction.userId,
        });
      }),
      take(1),
      switchMap((response) => {
        generatedId = response.transactionId;
        return this.transactions;
      }),
      take(1),
      tap((transations) => {
        newTransaction.id = generatedId;
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
        return this.http.get<TransactionData[]>(
          this.apiUrl + `user/${fetchedUserId}/transactions`
        );
      }),
      map((transactionsResponse) => {
        const transactions: Transaction[] = [];

        transactionsResponse.forEach((t) => {
          transactions.push(
            new Transaction(
              t.transactionId,
              t.type,
              t.purpose,
              +t.amount,
              new Date(t.date),
              t.imageUrl,
              t.userId
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

  updateTransaction(id: number, transactionData: TransactionData) {
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
          (pl) => pl.id === id
        );
        updatedTransactions = [...transactions];
        const oldTransaction = updatedTransactions[updatedTransactionIndex];
        updatedTransactions[updatedTransactionIndex] = new Transaction(
          id,
          transactionData.type,
          transactionData.purpose,
          +transactionData.amount,
          new Date(transactionData.date),
          transactionData.imageUrl,
          oldTransaction.userId
        );

        return this.http.put(
          this.apiUrl + `transaction/${id}`,
          {
            purpose: updatedTransactions[updatedTransactionIndex].purpose,
            type: updatedTransactions[updatedTransactionIndex].type.toString(),
            date: updatedTransactions[updatedTransactionIndex].date
              .toISOString()
              .slice(0, 10),
            amount: updatedTransactions[updatedTransactionIndex].amount,
            imageUrl: updatedTransactions[updatedTransactionIndex].imageUrl,
            userId: updatedTransactions[updatedTransactionIndex].userId,
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
        newTransactions = transactions.filter((t) => t.id !== id);

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
        newBalance += t.amount;
      } else {
        newBalance -= t.amount;
      }
    });

    this._balance.next(newBalance);
  }
}
