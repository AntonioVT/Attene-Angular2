import { Component, OnInit, DoCheck } from '@angular/core';
import { NavigationService } from "app/services/local-services/navigation-services/navigation.service";
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css'],
})
export class MainNavBarComponent {

  user: Observable<firebase.User>;
  loggedIn: boolean = true;
  loadedUser: boolean = true;

  constructor(private navigationService: NavigationService, private authService: AuthService) {
    var vm = this;

    this.user = authService.afa.authState;
    this.user.subscribe(authData => {
      console.log(authData);
      vm.toggleUserMenu(authData);
    });
  }

  toggleUserMenu(data){
    if(data){
      this.loggedIn = true;
      this.loadedUser = true;
    } else{
      this.loggedIn = false;
      this.loadedUser = true;
    }
  }


  openSideBar() {
    this.navigationService.toggleSideBar();
  }

  logout() {
    this.authService.logout();
  }

}
