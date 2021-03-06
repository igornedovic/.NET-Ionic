import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransactionItem } from 'src/app/new-transaction/transaction.model';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  fromDate: string;
  toDate: string;
  range: { lower: number; upper: number };
  max: number;
  @Input() transactionItems: TransactionItem[];
  @Input() title: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const amounts = this.transactionItems.map(t => t.amount);
    this.max = Math.max(...amounts);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onFilter(modalForm: NgForm) {
    if (!modalForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        fromDate: new Date(modalForm.value.fromDate).toISOString().slice(0, 10),
        toDate: new Date(modalForm.value.toDate).toISOString().slice(0, 10),
        range: modalForm.value.range,
      },
      'confirm'
    );
  }
}
