import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../new-transaction/transaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  userForm: FormGroup;
  balance: number;
  userId: number;
  private userSub: Subscription;
  private transactionSub: Subscription;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
    });

    this.userSub = this.authService.user.subscribe((user) => {
      this.userId = user.userId;

      this.userForm.get('firstName').setValue(user.firstName);
      this.userForm.get('lastName').setValue(user.lastName);
      this.userForm.get('email').setValue(user.email);
      this.userForm.get('username').setValue(user.username);
    });

    this.transactionSub = this.transactionService.balance.subscribe(
      (balance) => {
        this.balance = balance;
      }
    );
  }

  onUpdateProfile() {
    if (this.userForm.invalid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Updating profile...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .updateProfile(this.userId, this.userForm.value)
          .subscribe((response) => {
            console.log(response);
            loadingEl.dismiss();
            this.userForm.markAsUntouched();
          });
      });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
  }
}
