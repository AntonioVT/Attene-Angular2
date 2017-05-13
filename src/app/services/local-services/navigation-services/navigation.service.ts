import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavigationService {

  constructor() { }

  // observable string sources
  private sideNavBar = new Subject<string>();

  // observable string streams
  sideNavBar$ = this.sideNavBar.asObservable();

  toggleSideBar(){
    this.sideNavBar.next();
  }
}
