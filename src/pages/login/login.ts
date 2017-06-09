import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { PasswordPage } from '../password/password';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RemoteServiceProvider]
})

export class LoginPage {

	private login: FormGroup;

	signupPage = SignupPage;
	passwordPage = PasswordPage;
	constructor(public navCtrl: NavController, private remoteServiceProvider: RemoteServiceProvider, private formBuilder: FormBuilder) {
		this.login = this.formBuilder.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
		});
	}

	logForm() {
		console.log(this.login.value.email)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');
	}

}
