import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
 Generated class for the RemoteServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RemoteServiceProvider {

  url: string = "http://127.0.0.1:8000/users/";
  login_url: string = "http://studio-tesseract.com/courier/wp-json/login/v2/user/";
  logout_url: string = "http://127.0.0.1:8000/logout/";

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getUser() {
    return this.http.get(this.url, {withCredentials: true})
      .map((res: Response) => res.json());
  }

  createUser(username: string, email: string, is_fb: boolean, password_or_token: any) {
    // if not facebook then api signup with password
    if(!is_fb) {
      return this.http.post(this.url, {
        "username": username,
        "email": email,
        "password": password_or_token
      }, {withCredentials: true})
        .map((res: Response) => res.json());
    }
    // else signup user with fb token
    else {
      return this.http.post(this.url, {
        "username": username,
        "email": email,
        "password": password_or_token
      }, {withCredentials: true})
        .map((res: Response) => res.json());
    }
  }

  loginUser(username: string, password: string) {
    let opt: RequestOptions;
    let myHeaders: Headers = new  Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    opt = new RequestOptions({
      headers: myHeaders,
      withCredentials: true
    });

    return this.http.post(this.login_url,
      {email: username, password: password})
      .map((res: Response) => res.json());
  }

  logoutUser() {
    return this.http.get(this.logout_url, {'withCredentials': true})
      .map((res: Response) => res.json())
  }
}
