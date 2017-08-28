import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from "app/services/local-services/navigation-services/navigation.service";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-side-bar',
  templateUrl: './main-side-bar.component.html',
  styleUrls: ['./main-side-bar.component.css'],
  host: { '(document:click)': 'disableToggle($event)' }
})

export class MainSideBarComponent implements OnDestroy {

  _router: Router;
  isToggled: boolean = false;
  subscription: Subscription;

  constructor(private navigationService: NavigationService, private router: Router) {
    this._router = router;
    this.subscription = navigationService.sideNavBar$.subscribe(
      () => {
        this.toggleSidebar();
      }
    );

  }

  ngDoCheck() {
    this.SetViewSettings();
  }

  SetViewSettings() {
    if(this._router.url === '/'){
      console.log('were at home');
    }
    console.log("URL: " + this._router.url);
  }

  getToggle() {
    if (this.isToggled) {
      return "toggled";
    } else {
      return "";
    }
  }

  getOverlay() {
    if (this.isToggled) {
      return "overlay-darken";
    } else {
      return "overlay";
    }
  }

  disableToggle(event) {
    if (this.isToggled && event.clientY > 64 && event.clientX > 240) {
      this.isToggled = false;
    }
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

