import { Component, OnInit } from '@angular/core';
import { NavigationService } from "app/services/local-services/navigation-services/navigation.service";

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css'],
})
export class MainNavBarComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  loggedIn: boolean = true;

  ngOnInit() {
    
  }

  openSideBar(){
    this.navigationService.toggleSideBar();
  }

}
