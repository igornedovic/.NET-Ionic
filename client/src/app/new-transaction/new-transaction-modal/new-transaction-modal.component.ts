import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { IonCheckbox, ModalController } from '@ionic/angular';
import { TransactionType } from '../transaction.model';

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
        purpose: this.transactionForm.get('purpose'),
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
    } else {
      this.isPersonalIncome = false;
    }
  }

  onBusinessIncomeChange(bi: IonCheckbox) {
    if (bi.checked === true) {
      this.isBusinessIncome = true;
      this.isPersonalIncome = false;
    } else {
      this.isBusinessIncome = false;
    }
  }

  onPersonalExpenseChange(pe: IonCheckbox) {
    if (pe.checked === true) {
      this.isPersonalExpense= true;
      this.isBusinessExpense= false;
    } else {
      this.isPersonalExpense= false;
    }
  }

  onBusinessExpenseChange(be: IonCheckbox) {
    if (be.checked === true) {
      this.isBusinessExpense = true;
      this.isPersonalExpense = false;
    } else {
      this.isBusinessExpense = false;
    }
  }
}
