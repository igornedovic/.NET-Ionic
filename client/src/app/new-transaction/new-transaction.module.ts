import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewTransactionPageRoutingModule } from './new-transaction-routing.module';
import { NewTransactionPage } from './new-transaction.page';
import { ImageInputComponent } from './image-input/image-input.component';
import { NewTransactionModalComponent } from './new-transaction-modal/new-transaction-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTransactionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NewTransactionPage,
    ImageInputComponent,
    NewTransactionModalComponent,
  ],
})
export class NewTransactionPageModule {}
