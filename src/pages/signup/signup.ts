import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [RemoteServiceProvider],
})

export class SignupPage {

  private signup: FormGroup;

  loginPage = LoginPage;
  constructor(public navCtrl: NavController,
              private remoteServiceProvider: RemoteServiceProvider,
              private formBuilder: FormBuilder) {
    this.signup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  signUpUser() {
    var username = this.signup.value.username;
    var email = this.signup.value.email;
    var password = this.signup.value.password;
    this.remoteServiceProvider.createUser(username, email, false, password)
    .subscribe((data) => {
      this.navCtrl.push(this.loginPage, {'status': true})
        .then(function () {
          console.log('signup successful!');
        }, function (error) {
          console.error(error);
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad signup');
  }
}
