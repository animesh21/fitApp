import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { PasswordPage } from '../password/password';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RemoteServiceProvider]
})

export class LoginPage {
	
	public user;

	signupPage = SignupPage;
	passwordPage = PasswordPage;
	constructor(public navCtrl: NavController, private remoteServiceProvider: RemoteServiceProvider) {
		this.loadPeople();
	}

	loadPeople(){
		this.remoteServiceProvider.getUser().subscribe((data) => {
			this.user = data;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');
	}

}
