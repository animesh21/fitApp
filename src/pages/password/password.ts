import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {
	signupPage = SignupPage
	constructor(public navCtrl: NavController) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad password');
	}

}
