import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  RouterLinkWithHrefDelegate,
} from '@ionic/angular';
import { Subscription } from 'rxjs';

import {
  Transaction,
  TransactionItem,
} from '../new-transaction/transaction.model';
import { TransactionService } from '../new-transaction/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  transactions: Transaction[];
  isLoading = false;
  message: string;
  private transactionSub: Subscription;

  constructor(
    private transactionService: TransactionService,
    private nav: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.transactionSub = this.transactionService.getTransactions().subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.message = error.error;
      }
    );

    this.transactionSub = this.transactionService.transactions.subscribe(
      (transactions) => {
        this.transactions = transactions;
      }
    );
  }

  onUpdateTransaction(transaction: Transaction) {
    this.nav.navigateForward('/new-transaction', {
      state: {
        title: 'Edit transaction',
        id: transaction.transactionId,
        type: transaction.type,
        monthYear: transaction.monthYear,
        totalAmount: transaction.totalAmount,
        transactionItems: transaction.transactionItems.map(ti => {
          return {...ti, date: new Date(ti.date).toISOString().slice(0, 10)}
        })
      },
    });
  }

  onDeleteTransaction(transactionId: number) {
    this.loadingCtrl
      .create({
        message: 'Deleting transaction...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.transactionService
          .deleteTransaction(transactionId)
          .subscribe(() => {
            loadingEl.dismiss();
          });
      });
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
  }
}
