import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/external-services/firebase/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rUsername: string;
  rEmail: string;
  rPassword: string;
  rConfirmPassword: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.registerUser(this.rEmail, this.rPassword, this.rUsername);
  }

}
