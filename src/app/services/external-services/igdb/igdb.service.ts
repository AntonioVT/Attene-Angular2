import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IgdbService {

  headers: Headers;
  mainUrl: string = 'https://igdbcom-internet-game-database-v1.p.mashape.com/';

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('X-Mashape-Key', 'YAthyiVAj5mshmd3KcQks5EdWyepp1GdW7QjsnyVVkBAex83RZ');
    this.headers.append('Accept', 'application/json');
  }

  searchGame(gameName: string){
    let vm = this;
    var url = this.mainUrl + "games/?fields=id%2Cname%2Cfirst_release_date%2Ccover.cloudinary_id&limit=10&offset=0&search=" + gameName;
    var x = this.http.get(url, {headers: vm.headers}).toPromise();
    return x;
  }

  getGame(gameId: number){
    let vm = this;
    var url = this.mainUrl + "games/" + gameId + "?fields=id%2Cname%2Cfirst_release_date%2Csummary%2Cdevelopers%2Curl";
    var x = this.http.get(url, {headers: vm.headers}).toPromise();
    return x;
  }

  getDeveloper(devId: number){
    let vm = this;
    var url = this.mainUrl + "companies/" + devId + "?fields=name";
    var x = this.http.get(url, {headers: vm.headers}).toPromise();
    return x;
  }

}
