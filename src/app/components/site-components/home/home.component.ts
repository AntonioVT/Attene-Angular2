import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../_shared/interface-thumbnail-section/interface-thumbnail-section.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public adbService: AdbService) {
    console.log('hey!!!');
  }

  isLoggedIn: boolean;
  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/1',
    'Zelda',
    'Interface', true);
  public test2: InterfaceThumbnail = new InterfaceThumbnail('https://ksr-ugc.imgix.net/assets/017/023/353/ce90b2402ed1f7c35374b65c185c473d_original.png?w=680&fit=max&v=1496959451&auto=format&lossless=true&s=237164ab2adb94f6535e6dcd59cbd70c',
    '/interface/2',
    'Zelda',
    'Interface', true);
  public sectionFeatured: InterfaceThumbnail[] = [this.test, this.test2, this.test, this.test, this.test, this.test, this.test];


  ngOnInit() {
  }

  login() {
    var vm = this;
    this.authService.loginWithMail('tony-vt@hotmail.com', '3').then((data) => {
      console.log('logged in!');
      console.log(data);
    }).catch(function (error) {
      console.log("whoopsie");
    });
  }

  displayAuthenticatedUser() {
    console.log(this.authService.getAuthenticatedUser());
  }

  logout() {
    this.authService.logout();
  }

  getSs() {
    /*this.adbService.getScreenshot().then(function (data) {
      var val = data.text();
      console.log(JSON.parse(val));
    }).catch(function (error) {
      console.log(error);
    });*/
  }



}
