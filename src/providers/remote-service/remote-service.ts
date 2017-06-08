import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
  
  url: string = "https://randomuser.me/api";

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getUser() {
  	console.log('inside getUser');
  	return this.http.get(this.url)
  	.do((res: Response) => console.log(res.json()))
  	.map((res: Response) => res.json());
  }

}
