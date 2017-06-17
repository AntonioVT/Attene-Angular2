import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public adbService: AdbService) { 
    console.log('hey!!!');
  }

  isLoggedIn: boolean;
  public test: InterfaceThumbnail = new InterfaceThumbnail();


  ngOnInit() {
    this.test.urlImage = "https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg";
    this.test.itfTitle = "Zelda";
    this.test.itfCategory = "Crafting";
    this.test.urlInterface = "/interface/0";
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

  getSs(){
    this.adbService.getScreenshot().then(function(data){
      var val = data.text();
      console.log(JSON.parse(val));
    }).catch(function(error){
      console.log(error);
    });
  }



}
