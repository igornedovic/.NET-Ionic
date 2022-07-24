import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import {
  CategoryName,
  TransactionItem,
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
  transactionItems: TransactionItem[] = [];
  searchedTransactionItems: TransactionItem[];
  totalDepositAmount: number;
  totalWithdrawalAmount: number;
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
        transactions.forEach(t => {
          t.transactionItems.forEach(ti => {
            console.log(ti);
            this.transactionItems.push(ti);
          })
        })
      }
    );
  }

  ngOnInit() {}

  openModal() {
    this.modalCtrl
      .create({
        component: SearchModalComponent,
        componentProps: { title: 'Add filters', transactionItems: this.transactionItems },
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
              this.searchedTransactionItems = response;

              this.changeChartParameters(this.searchedTransactionItems);
            }, error => {
              this.searchedTransactionItems = null;
              this.notFound = true;
            });

          
        }
      });
  }

  changeChartParameters(transactions: TransactionItem[]) {
    if (
      !transactions || transactions.length === 0
    ) {
      this.notFound = true;
    } else {
      this.totalDepositAmount = transactions.filter(
        (t) => t.purpose.itemCategory.name === CategoryName.PersonalIncome || t.purpose.itemCategory.name === CategoryName.BusinessIncome 
      ).map(t => t.amount).reduce((previous, current) => previous + current, 0);
      this.totalWithdrawalAmount = transactions.filter(
        (t) => t.purpose.itemCategory.name === CategoryName.PersonalExpense|| t.purpose.itemCategory.name === CategoryName.BusinessExpense
      ).map(t => t.amount).reduce((previous, current) => previous + current, 0);

      if (this.statsComponent) {
        this.statsComponent.donutChart.data.datasets[0].data[0] =
          this.totalDepositAmount;
        this.statsComponent.donutChart.data.datasets[0].data[1] =
          this.totalWithdrawalAmount;

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
