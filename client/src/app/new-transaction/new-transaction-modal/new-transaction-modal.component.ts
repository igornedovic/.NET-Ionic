import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonCheckbox, ModalController } from '@ionic/angular';

import { ItemCategory, Purpose, TransactionType } from '../transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-new-transaction-modal',
  templateUrl: './new-transaction-modal.component.html',
  styleUrls: ['./new-transaction-modal.component.scss'],
})
export class NewTransactionModalComponent implements OnInit {
  @Input() title: string;
  @Input() transactionForm: FormGroup;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() itemCategories: ItemCategory[];
  @Input() purposes: Purpose[];

  filteredPurposes: Purpose[];

  isFetchedImage = false;
  isPopulated = false;
  isTypeChosen = true;
  isDeposit = false;
  isPersonalIncome = false;
  isBusinessIncome = false;
  isPersonalExpense = false;
  isBusinessExpense = false;

  constructor(
    private modalCtrl: ModalController,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    if (!this.transactionForm.get('type').value) {
      this.isTypeChosen = false;
    }

    if (this.transactionForm.get('type').value === TransactionType.Deposit) {
      this.isDeposit = true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddItem() {
    let uploadImageUrl: string;

    this.transactionService
      .uploadImage(
        this.transactionForm.get('transactionItems').get('imageUrl').value
      )
      .subscribe((uploadRes) => {
        uploadImageUrl = uploadRes.url;

        this.modalCtrl.dismiss(
          {
            purposeId: this.transactionForm
              .get('transactionItems')
              .get('purposeId'),
            date: this.transactionForm.get('transactionItems').get('date'),
            amount: this.transactionForm.get('transactionItems').get('amount'),
            imageUrl: uploadImageUrl,
          },
          'confirm'
        );
      });
  }

  onImageImported(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        // const blobUrl = URL.createObjectURL(new Blob([imageData.replace('data:image/jpeg;base64,', '')], {type: 'text/plain'}));
        imageFile = new File(
          [new Blob([imageData.includes('jpeg') ? imageData.replace('data:image/png;base64,', '') : imageData.replace('data:image/jpeg;base64,', '')])],
          'camera.jpg',
          { type: 'image/jpg', lastModified: new Date().getTime() }
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }

    this.transactionForm
      .get('transactionItems')
      .patchValue({ imageUrl: imageFile });
    this.isFetchedImage = false;
    this.isPopulated = true;
  }

  onPersonalIncomeChange(pi: IonCheckbox) {
    if (pi.checked === true) {
      this.isPersonalIncome = true;
      this.isBusinessIncome = false;

      this.filterPurposesByItemCategory(+pi.value);
    } else {
      this.isPersonalIncome = false;
    }
  }

  onBusinessIncomeChange(bi: IonCheckbox) {
    if (bi.checked === true) {
      this.isBusinessIncome = true;
      this.isPersonalIncome = false;

      this.filterPurposesByItemCategory(+bi.value);
    } else {
      this.isBusinessIncome = false;
    }
  }

  onPersonalExpenseChange(pe: IonCheckbox) {
    if (pe.checked === true) {
      this.isPersonalExpense = true;
      this.isBusinessExpense = false;

      this.filterPurposesByItemCategory(+pe.value);
    } else {
      this.isPersonalExpense = false;
    }
  }

  onBusinessExpenseChange(be: IonCheckbox) {
    if (be.checked === true) {
      this.isBusinessExpense = true;
      this.isPersonalExpense = false;

      this.filterPurposesByItemCategory(+be.value);
    } else {
      this.isBusinessExpense = false;
    }
  }

  filterPurposesByItemCategory(itemCategoryId: number) {
    this.filteredPurposes = this.purposes.filter(
      (p) => p.itemCategory.itemCategoryId === itemCategoryId
    );
  }
}
