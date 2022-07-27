import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NewTransactionModalComponent } from './new-transaction-modal/new-transaction-modal.component';
import { TransactionType } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.page.html',
  styleUrls: ['./new-transaction.page.scss'],
})
export class NewTransactionPage implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  balance: number;
  isFetchedImage = false;
  monthYear: Date;
  minDate: string;
  maxDate: string;

  private transactionSub: Subscription;

  transactionTypes = Object.values(TransactionType);
  title: string;
  transactionId: number;
  type: string;
  purpose: string;
  amount: number;
  date: string;
  image: string | File;

  maxValidator: ValidatorFn; // stored on class level because of reference comparison

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.transactionForm = new FormGroup({
      type: new FormControl('', Validators.required),
      monthYear: new FormControl('', Validators.required),
      purpose: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      imageUrl: new FormControl('', Validators.required),
      totalAmount: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.transactionSub = this.transactionService.balance.subscribe(
      (balance) => {
        this.balance = balance;
        this.maxValidator = Validators.max(this.balance);
      }
    );
  }

  ionViewWillEnter() {
    if (history.state) {
      this.title = history.state.title;
      this.transactionId = history.state.id;
      this.type = history.state.type;
      this.purpose = history.state.purpose;
      this.amount = history.state.amount;
      this.date = history.state.date;
      this.image = history.state.image;

      this.transactionForm.get('type').setValue(this.type);
      this.transactionForm.get('purpose').setValue(this.purpose);
      this.transactionForm.get('amount').setValue(this.amount);
      this.transactionForm.get('date').setValue(this.date);
      this.transactionForm.get('imageUrl').setValue(this.image);

      if (this.transactionForm.get('imageUrl').value) {
        this.isFetchedImage = true;
      }
    }
  }

  openModal() {
    this.modalCtrl
      .create({
        component: NewTransactionModalComponent,
        componentProps: { title: 'Add item' },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          console.log("USPESNO");
        }
      });
  }

  onTypeChange(event) {
    const type = event.detail.value;

    if (this.transactionForm.get('type').value == this.transactionTypes[1]) {
      this.transactionForm.get('amount').addValidators(this.maxValidator);
    } else if (
      this.transactionForm.get('type').value == this.transactionTypes[0] &&
      this.transactionForm.get('amount').hasValidator(this.maxValidator)
    ) {
      this.transactionForm.get('amount').removeValidators(this.maxValidator);
    }

    this.transactionForm.get('amount').updateValueAndValidity();
  }

  onDateChanged(event) {
    this.monthYear = new Date(event.target.value);
    console.log(this.monthYear.toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    }));
    this.minDate = new Date(this.monthYear.getFullYear(), this.monthYear.getMonth(), 1).toLocaleDateString('en-ca');
    this.maxDate = new Date(this.monthYear.getFullYear(), this.monthYear.getMonth(), 31).toLocaleDateString('en-ca');
    // console.log(this.minDate);
    // console.log(this.maxDate);
  }

  onAddTransaction() {
    this.loadingCtrl
      .create({
        message: 'Adding transaction...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.transactionService
          .uploadImage(this.transactionForm.get('imageUrl').value)
          .pipe(
            switchMap((uploadRes) => {
              return this.transactionService.addTransaction(
                this.transactionForm.value,
                uploadRes.url
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.transactionForm.reset();
            this.router.navigate(['/home']);
          });
      });
  }

  onUpdateTransaction() {
    // this.loadingCtrl
    //   .create({
    //     message: 'Updating transaction...',
    //   })
    //   .then((loadingEl) => {
    //     loadingEl.present();
    //     this.transactionService
    //       .updateTransaction(this.transactionId, this.transactionForm.value)
    //       .subscribe((response) => {
    //         console.log(response);
    //         loadingEl.dismiss();
    //         this.transactionForm.reset();
    //         this.router.navigate(['/home']);
    //       });
    //   });
  }

  onImageImported(imageData: string | File) {
    this.transactionForm.patchValue({ imageUrl: imageData });
    this.isFetchedImage = false;
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
  }
}
