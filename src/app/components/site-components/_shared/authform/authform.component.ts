import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authform',
  templateUrl: './authform.component.html',
  styleUrls: ['./authform.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // to-do
  // redirect if user already logged in
  // no need to display login/register/forgot password
  redirect(){

  }

}
