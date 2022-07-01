import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onRegister() {
    this.loadingCtrl.create({ message: 'Registering...' }).then((loading) => {
      loading.present();

      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          loading.dismiss();
          this.router.navigateByUrl('/login');
        },
        (error) => {
          loading.dismiss();
          let message = error.error;

          this.alertCtrl
            .create({
              header: 'Registration failed',
              message,
              buttons: ['Okay'],
            })
            .then((alert) => {
              alert.present();
            });
        }
      );
    });
  }
}
