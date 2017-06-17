import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdbService {

  headers: Headers;
  mainUrl: string = 'http://localhost:53031/api/';

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  // User Controller
  // HTTP GET
  getUserExistence(email: string, username: string){
    let vm = this;
    var url = vm.mainUrl + 'users?email=' + email + '&username=' + username;
    return this.http.get(url, {headers: vm.headers}).toPromise();
  }

  // HTTP POST
  setUser(newUserData: any){
    let vm = this;
    var url = vm.mainUrl + 'users';
    return this.http.post(url, newUserData, {headers: vm.headers}).toPromise();
  }

  // Screenshyot Controller
  // HTTP GET
  getScreenshot() {
    let vm = this;
    var url = this.mainUrl + 'screenshots'
    var x = this.http.get(url, { headers: vm.headers }).toPromise();
    return x;
  }

}
