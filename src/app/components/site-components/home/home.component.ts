import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "app/services/external-services/firebase/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  isLoggedIn: boolean;

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



}
