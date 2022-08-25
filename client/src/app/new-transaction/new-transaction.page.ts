import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonItemSliding,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ItemCategoryService } from '../services/item-category.service';
import { PurposeService } from '../services/purpose.service';
import { NewTransactionModalComponent } from './new-transaction-modal/new-transaction-modal.component';
import {
  ItemCategory,
  Purpose,
  TransactionItem,
  TransactionType,
} from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.page.html',
  styleUrls: ['./new-transaction.page.scss'],
})
export class NewTransactionPage implements OnInit, OnDestroy {
  @ViewChild('monthYearRef', { read: ElementRef }) monthYearRef: ElementRef;
  transactionForm: FormGroup;
  balance: number;
  isFetchedImage = false;
  monthYear: Date;
  minDate: string;
  maxDate: string;
  itemCategories: ItemCategory[];
  purposes: Purpose[];
  addedTransactionItems: TransactionItem[] = [];
  transactionItemCounter = 0;

  private transactionSub: Subscription;
  private itemCategorySub: Subscription;
  private purposeSub: Subscription;

  transactionTypes = Object.values(TransactionType);
  title: string;
  transactionIdEdit: number;
  typeEdit: string;
  monthYearEdit: string;
  totalAmountEdit: number;
  transactionItemsEdit: TransactionItem[];

  maxValidator: ValidatorFn; // stored on class level because of reference comparison

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private itemCategoryService: ItemCategoryService,
    private purposeService: PurposeService
  ) {}

  ngOnInit() {
    this.transactionForm = new FormGroup({
      type: new FormControl('', Validators.required),
      monthYear: new FormControl('', Validators.required),
      transactionItems: new FormGroup({
        purposeId: new FormControl(0, Validators.required),
        date: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required, Validators.min(1)]),
        imageUrl: new FormControl('', Validators.required),
      }),
      totalAmount: new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    this.transactionSub = this.transactionService.balance.subscribe(
      (balance) => {
        this.balance = balance;
        this.maxValidator = Validators.max(this.balance);
      }
    );

    this.itemCategorySub = this.itemCategoryService
      .getItemCategories()
      .subscribe((itemCategories) => {
        this.itemCategories = itemCategories;
      });
    this.purposeSub = this.purposeService
      .getPurposes()
      .subscribe((purposes) => {
        this.purposes = purposes;
      });
  }

  ionViewWillEnter() {
    this.transactionForm.get('totalAmount').setValue(0);

    if (history.state.id) {
      this.title = history.state.title;
      this.transactionIdEdit = history.state.id;
      this.typeEdit = history.state.type;
      this.monthYearEdit = history.state.monthYear;
      this.totalAmountEdit = history.state.totalAmount;
      this.transactionItemsEdit = history.state.transactionItems;

      this.transactionForm.get('type').setValue(this.typeEdit);
      this.transactionForm.get('monthYear').setValue(this.monthYearEdit);
      this.transactionForm.get('totalAmount').setValue(this.totalAmountEdit.toFixed(2));
      this.addedTransactionItems = this.transactionItemsEdit;

      if (this.transactionForm.get('transactionItems').get('imageUrl').value) {
        this.isFetchedImage = true;
      }
    }
  }

  openModal() {
    this.transactionForm.get('transactionItems').reset();

    this.modalCtrl
      .create({
        component: NewTransactionModalComponent,
        componentProps: {
          title: 'Add item',
          transactionForm: this.transactionForm,
          minDate: this.minDate,
          maxDate: this.maxDate,
          itemCategories: this.itemCategories,
          purposes: this.purposes,
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          const purposeName = this.purposes.find(
            (p) => p.purposeId === modalData.data.purposeId.value
          ).name;

          this.transactionItemCounter += 1;

          this.addedTransactionItems.push(
            new TransactionItem(
              this.transactionItemCounter,
              new Date(modalData.data.date.value).toISOString().slice(0, 10),
              +modalData.data.amount.value,
              modalData.data.imageUrl.toString(),
              new Purpose(+modalData.data.purposeId.value, purposeName)
            )
          );

          this.transactionForm
            .get('totalAmount')
            .setValue(
              this.transactionForm.get('totalAmount').value +
                modalData.data.amount.value
            );
        }
      });
  }

  onTypeChange(event) {
    const type = event.detail.value;

    if (this.transactionForm.get('type').value == this.transactionTypes[1]) {
      this.transactionForm.get('totalAmount').addValidators(this.maxValidator);
    } else if (
      this.transactionForm.get('type').value == this.transactionTypes[0] &&
      this.transactionForm.get('totalAmount').hasValidator(this.maxValidator)
    ) {
      this.transactionForm
        .get('totalAmount')
        .removeValidators(this.maxValidator);
    }

    this.transactionForm.get('totalAmount').updateValueAndValidity();
  }

  onDateChanged(event) {
    this.monthYear = new Date(event.target.value);

    this.transactionForm.get('monthYear').setValue(
      this.monthYear.toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
      })
    );

    this.minDate = new Date(
      this.monthYear.getFullYear(),
      this.monthYear.getMonth(),
      1
    ).toLocaleDateString('en-ca');
    this.maxDate = new Date(
      this.monthYear.getFullYear(),
      this.monthYear.getMonth(),
      31
    ).toLocaleDateString('en-ca');
  }

  onCancelItem(transactionItemId: number, slidingElement: IonItemSliding) {
    slidingElement.close();

    this.transactionForm
      .get('totalAmount')
      .setValue(
        this.transactionForm.get('totalAmount').value -
          this.addedTransactionItems.find(
            (ti) => ti.transactionItemId === transactionItemId
          ).amount
      );

    this.addedTransactionItems = this.addedTransactionItems.filter(
      (ti) => ti.transactionItemId !== transactionItemId
    );

    for (let i = 0; i < this.addedTransactionItems.length; i++) {
      this.addedTransactionItems[i].transactionItemId = i + 1;
    }
  }

  onAddTransaction() {
    this.loadingCtrl
      .create({
        message: 'Adding transaction...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.transactionService
          .addTransaction(
            this.transactionForm.value,
            this.addedTransactionItems
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.transactionForm.reset();
            this.addedTransactionItems = [];
            this.transactionItemCounter = 0;
            this.router.navigate(['/home']);
          });
      });
  }

  onUpdateTransaction() {
    this.loadingCtrl
      .create({
        message: 'Updating transaction...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.transactionService
          .updateTransaction(this.transactionIdEdit, this.transactionForm.value, this.addedTransactionItems)
          .subscribe((response) => {
            console.log(response);
            loadingEl.dismiss();
            this.transactionForm.reset();
            this.addedTransactionItems = [];
            this.router.navigate(['/home']);
          });
      });
  }

  onImageImported(imageData: string | File) {
    this.transactionForm.patchValue({ imageUrl: imageData });
    this.isFetchedImage = false;
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }

    if (this.itemCategorySub) {
      this.itemCategorySub.unsubscribe();
    }

    if (this.purposeSub) {
      this.purposeSub.unsubscribe();
    }
  }
}
