import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {PasswordPage} from '../password/password';
import {ProfilePage} from '../profile_view/profile_view';
import {RemoteServiceProvider} from '../../providers/remote-service/remote-service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NativeStorage, Facebook} from 'ionic-native'
import {ShareService} from '../../providers/share-service/share-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RemoteServiceProvider, Facebook]
})

export class LoginPage {
  FB_APP_ID: number = 1885140855066991;
  private login: FormGroup;

  profilePage = ProfilePage;
  signupPage = SignupPage;
  passwordPage = PasswordPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private remoteServiceProvider: RemoteServiceProvider,
              private formBuilder: FormBuilder,
              private shareService: ShareService) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    Facebook.browserInit(this.FB_APP_ID, "v2.9")
      .then((data) => {
        console.log(data);
      }, (error) => {
        console.error(error);
      });
  }


  doFbLogin() {
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    permissions = ["public_profile", "email"];

    Facebook.login(permissions)
      .then((response) => {

        let userId = response.authResponse.userID;
        let token = response.authResponse.accessToken;
        this.shareService.setUsername(userId);
        this.shareService.setIsLoggedIn(true);
        this.shareService.setLoginType('fb');

        let params = new Array<string>();
        params = ['email', 'public_profile'];
        Facebook.api("/me?fields=name,email,gender", params)
          .then((user) => {
            console.log(user.email);
            this.remoteServiceProvider.createUser(user.email, user.email, true, token)
              .subscribe((res) => {
              console.log('fb signup successful')
              }, (error) => {
              console.log(error);
              });
            this.shareService.setUsername(user.email);
            NativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                type: 'fb'
              })
              .then(() => {
                nav.push(ProfilePage, {
                  status: true, username: userId,
                  remoteServiceProvider: this.remoteServiceProvider
                })
                  .then(() => {
                    console.log('login through fb succuessful');
                  }, (error) => {
                    console.log(error);
                  });
              }, (error) => {
                console.log(error);
              });
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
  }


  loginUser() {
    let username = this.login.value.username;
    let password = this.login.value.password;
    this.remoteServiceProvider.loginUser(username, password)
      .subscribe((data) => {
      console.log(data);
        this.shareService.setUsername(data.username);
        this.shareService.setIsLoggedIn(true);
        this.shareService.setLoginType('api');

        this.navCtrl.push(this.profilePage, {
          status: true, username: data.username,
          remoteServiceProvider: this.remoteServiceProvider
        })
          .then((data) => {
            console.log('login successful: ', data);
          }, (error) => {
            console.error(error);
          });
        }, (error) => {
          console.error(error);
        });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
