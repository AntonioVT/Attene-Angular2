import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Screenshot } from "app/classes/screenshot";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AdbService {

  headers: Headers;
  mainUrl: string = 'http://localhost:53031/api/';
  _currentUser: string = null;
  currentUser: Subject<string> = null;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.currentUser = new Subject();
  }


  // Status Controller
  // HTTP GET
  getAPIStatus() {
    let vm = this;
    var url = vm.mainUrl + 'status'
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  // User Controller
  // HTTP GET
  getUserExistence(email: string, username: string) {
    let vm = this;
    var url = vm.mainUrl + 'users?email=' + email + '&username=' + username;
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  getCurrentUser(data: any) {
    console.log(data);
    let vm = this;
    if (data) {
      var url = vm.mainUrl + 'users/gubmak?email=' + data.email + '&skey=' + data.uid;
      var x = this.http.get(url, { headers: vm.headers }).toPromise();
      x.then(function (data) {
        console.log(data.json());
        vm._currentUser = data.json();
        vm.currentUser.next(vm._currentUser);
      });
    } else {
      vm._currentUser = null;
      vm.currentUser.next(null);
    }
  }

  // HTTP POST
  setUser(newUserData: any) {
    let vm = this;
    var url = vm.mainUrl + 'users';
    return this.http.post(url, newUserData, { headers: vm.headers }).toPromise();
  }

  // Screenshot Controller
  // HTTP GET
  getScreenshot(id: number) {
    let vm = this;
    var url = this.mainUrl + 'screenshots/' + id;
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  setScreenshot(ss: Screenshot) {
    let vm = this;
    var url = vm.mainUrl + 'screenshots';
    return this.http.post(url, ss, { headers: vm.headers }).toPromise();
  }

  // Categories Controller
  getCategories() {
    let vm = this;
    var url = this.mainUrl + 'categories';
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  // Game Controller
  getGame(id: number) {
    let vm = this;
    var url = this.mainUrl + 'game/' + id;
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }

  searchCommunityGame(gameName: string) {
    let vm = this;
    var url = this.mainUrl + 'game/?gameName=' + gameName;
    return this.http.get(url, { headers: vm.headers }).toPromise();
  }


}
