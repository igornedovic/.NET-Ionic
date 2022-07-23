import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Transaction } from 'src/app/new-transaction/transaction.model';
import { TransactionService } from 'src/app/new-transaction/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {
  transaction: Transaction;
  isLoading = false;
  private transactionSub: Subscription;

  constructor(
    private transactionService: TransactionService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('transactionId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }

      this.isLoading = true;

      this.transactionSub = this.transactionService
        .getTransaction(+paramMap.get('transactionId'))
        .subscribe((transaction) => {
          this.transaction = transaction;
          this.isLoading = false;
        }, error => {
          this.alertCtrl
            .create({
              header: 'An error ocurred!',
              message: 'Could not load transaction.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/home']);
                  }
                }
              ]
            })
            .then(alertEl => alertEl.present());
        });
    });
  }
}
