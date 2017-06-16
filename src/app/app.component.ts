import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ShareService } from '../providers/share-service/share-service';
import { ProfilePage } from '../pages/profile_view/profile_view';
import { NativeStorage } from 'ionic-native'

@Component({
  templateUrl: 'app.html',
  providers: [ShareService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;

      NativeStorage.getItem('user')
      .then((data) => {
        env.nav.push(ProfilePage);
        statusBar.styleDefault();
        splashScreen.hide();
      }, (error) => {
        env.nav.push(LoginPage);
        splashScreen.hide();
      });
      statusBar.styleDefault();
    });
  }
}
