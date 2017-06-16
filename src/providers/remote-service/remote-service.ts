import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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
  login_url: string = "http://127.0.0.1:8000/login/";
  logout_url: string = "http://127.0.0.1:8000/logout/";

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getUser() {
    return this.http.get(this.url, {withCredentials: true})
      .map((res: Response) => res.json());
  }

  createUser(username: string, email: string, password: string) {
    return this.http.post(this.url, {
      "username": username,
      "email": email,
      "password": password
    }, {withCredentials: true})
      .map((res: Response) => res.json());
  }

  loginUser(username: string, password: string) {
    return this.http.post(this.login_url,
      {username: username, password: password}, {'withCredentials': true})
      .map((res: Response) => res.json());
  }

  logoutUser() {
    return this.http.get(this.logout_url, {'withCredentials': true})
      .map((res: Response) => res.json())
  }
}
