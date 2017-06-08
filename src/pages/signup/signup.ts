import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
	loginPage = LoginPage
	constructor(public navCtrl: NavController) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad signup');
	}

}
