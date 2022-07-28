import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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

}
