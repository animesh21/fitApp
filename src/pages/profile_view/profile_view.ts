import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular'
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { LoginPage } from "../login/login";
import { ShareService } from "../../providers/share-service/share-service";
import { Facebook, NativeStorage } from "ionic-native"

@Component({
    selector: 'page-profile',
    templateUrl: 'profile_view.html'
})

export class ProfilePage {

  user: any;
  userReady: boolean = false;

  loginPage = LoginPage;
  loginType: string;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private remoteServiceProvider: RemoteServiceProvider,
              private shareService: ShareService,
              private platform: Platform) {
    if(navParams.get('remoteServiceProvider')) {
      this.remoteServiceProvider = navParams.get('remoteServiceProvider');

    }
  }

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
      .then((data) => {
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture
        };
        env.userReady = true;
      }, (error) => {
        console.error(error);
      });
  }

  logoutHelper(loginType: string) {
    if(loginType == 'api') {
      this.remoteServiceProvider.logoutUser()
        .subscribe((data) => {
          this.navCtrl.popToRoot()
            .then(() => {
              console.log('logout successful');
            }, (error) => {
              console.error(error);
            })
        }, (err) => {
          console.log(err);
        });
    }
    else if(loginType == 'fb') {
      Facebook.logout()
        .then((response) => {
        this.navCtrl.popToRoot()
          .then(() => {
          console.log('fb logout successful');
          }, (error) => {
          console.error(error);
          });
        }, (error) => {
        console.log('error in fb logout');
        console.log(error);
        });
    }
    else {
      console.log('logout through else');
      this.navCtrl.popToRoot();
    }
    this.shareService.setUsername('');
    this.shareService.setIsLoggedIn(false);

  }

  logoutUser() {
    let loginType = this.loginType;
    if(this.platform.is('cordova')) {
      NativeStorage.getItem('user')
        .then((data) => {
        loginType = data.type;
        }, (error) => {
        console.error(error);
        })
        .then(() => {
        this.logoutHelper(loginType);
        }, (error) => {
        console.error(error);
        });
        NativeStorage.remove('user')
          .then(() => {
          console.log('user removed from native storage');
          this.logoutHelper(loginType);
          }, (error) => {
          console.error(error);
          });
    }
    else {
      loginType = this.shareService.getLoginType();
      this.logoutHelper(loginType);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }
}
