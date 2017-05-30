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
    this.headers.append('Context-Type', 'application/json');
  }

  getScreenshot() {
    let vm = this;
    var url = this.mainUrl + 'screenshots'
    var x = this.http.get(url, { headers: vm.headers }).toPromise();
    return x;
  }

}
