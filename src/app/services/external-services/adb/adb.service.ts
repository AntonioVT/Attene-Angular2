import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Screenshot } from "app/classes/screenshot";

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

  // Screenshot Controller
  // HTTP GET
  getScreenshot() {
    let vm = this;
    var url = this.mainUrl + 'screenshots';
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  setScreenshot(ss: Screenshot){
    let vm = this;
    var url = vm.mainUrl + 'screenshots';
    return this.http.post(url, ss, {headers: vm.headers}).toPromise();
  }

  // Categories Controller
  getCategories(){
    let vm = this;
    var url = this.mainUrl + 'categories';
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }
  

}
