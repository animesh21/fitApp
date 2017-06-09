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

	loginPage = LoginPage
	constructor(public navCtrl: NavController, private remoteServiceProvider: RemoteServiceProvider, private formBuilder: FormBuilder) {
        this.signup = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', Validators.required]
        })
	}

    logSignUpForm() {
        var email = this.signup.value.email
        var password = this.signup.value.password
        this.remoteServiceProvider.createUser(email, password)
        .subscribe((data) => {
            console.log(data);
        });
    }
	
    ionViewDidLoad() {
		console.log('ionViewDidLoad signup');
	}

}
