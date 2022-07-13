import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import {
  Transaction,
  TransactionType,
} from '../new-transaction/transaction.model';
import { TransactionService } from '../new-transaction/transaction.service';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  transactions: Transaction[];
  searchedTransactions: Transaction[];
  depositNumber: number;
  withdrawalNumber: number;
  private transactionSub: Subscription;

  @ViewChild(StatsComponent) statsComponent;

  isLoading = false;
  notFound = false;

  constructor(
    private modalCtrl: ModalController,
    private transactionService: TransactionService
  ) {
    this.transactionSub = this.transactionService.transactions.subscribe(
      (transactions) => {
        this.transactions = transactions;
      }
    );
  }

  ngOnInit() {}

  openModal() {
    this.modalCtrl
      .create({
        component: SearchModalComponent,
        componentProps: { title: 'Add filters', transactions: this.transactions },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          this.transactionService
            .getFilteredTransactions(
              modalData.data.fromDate,
              modalData.data.toDate,
              modalData.data.range.lower,
              modalData.data.range.upper
            )
            .subscribe((response) => {
              this.searchedTransactions = response;

              this.changeChartParameters(this.searchedTransactions);
            }, error => {
              this.searchedTransactions = null;
              this.notFound = true;
            });

          
        }
      });
  }

  changeChartParameters(transactions: Transaction[]) {
    if (
      !transactions || transactions.length === 0
    ) {
      this.notFound = true;
    } else {
      this.depositNumber = transactions.filter(
        (t) => t.type === TransactionType.Deposit
      ).length;
      this.withdrawalNumber = transactions.filter(
        (t) => t.type === TransactionType.Withdrawal
      ).length;

      if (this.statsComponent) {
        this.statsComponent.donutChart.data.datasets[0].data[0] =
          this.depositNumber;
        this.statsComponent.donutChart.data.datasets[0].data[1] =
          this.withdrawalNumber;

        this.statsComponent.donutChart.update();
      }
    }
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
  }
}
