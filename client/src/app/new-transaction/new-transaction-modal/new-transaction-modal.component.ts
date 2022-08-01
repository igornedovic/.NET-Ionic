import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { IonCheckbox, ModalController } from '@ionic/angular';

import { ItemCategory, Purpose, TransactionType } from '../transaction.model';

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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (!this.transactionForm.get("type").value) {
      this.isTypeChosen = false;
    }

    if (this.transactionForm.get("type").value === TransactionType.Deposit) {
      this.isDeposit = true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddItem() {
    this.modalCtrl.dismiss(
      {
        purposeId: this.transactionForm.get('purposeId'),
        date: this.transactionForm.get('date'),
        amount: this.transactionForm.get('amount'),
        imageUrl: this.transactionForm.get('imageUrl'),
      },
      'confirm'
    );
  }

  onImageImported(imageData: string | File) {
    this.transactionForm.patchValue({ imageUrl: imageData });
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
      this.isPersonalExpense= true;
      this.isBusinessExpense= false;

      this.filterPurposesByItemCategory(+pe.value);
    } else {
      this.isPersonalExpense= false;
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
    this.filteredPurposes = this.purposes.filter(p => p.itemCategory.itemCategoryId === itemCategoryId);
  }
}
