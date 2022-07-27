import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-transaction-modal',
  templateUrl: './new-transaction-modal.component.html',
  styleUrls: ['./new-transaction-modal.component.scss'],
})
export class NewTransactionModalComponent implements OnInit {
  @Input() title: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddItem(modalForm: NgForm) {
    this.modalCtrl.dismiss(
      {

      },
      'confirm'
    );
  }

}
