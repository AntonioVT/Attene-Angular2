import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AuthformComponent } from "app/components/site-components/_shared/authform/authform.component";
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { DatabaseService } from "app/services/external-services/firebase/database.service";
import { Router } from "@angular/router";
import { AdbService } from "app/services/external-services/adb/adb.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lUsername: string;
  lPassword: string;

  lUsernameErrorMessage: any;

  constructor(public authService: AuthService, public adbService: AdbService, private router: Router) { }

  ngOnInit() {
  }

  validateInput(name: string) {

    if (this.lUsername) {

    }
    else {
      return;
    }

    switch (name) {
      case 'username': {
        // regex alphanumeric
        var regex = /^[a-zA-Z0-9]+$/;
        var username = this.lUsername;
        if (!username.match(regex)) {
          // alert
          //console.log('bad');
        } else {
          //console.log('good');
        }
        break;
      }
    }
  }

  login(email: string, password: string) {
    var vm = this;

    vm.adbService.getAPIStatus().then(response => {
      vm.authService.loginWithMail(email, password).then((data) => {
        vm.router.navigate(['/']);
      }).catch(function (error) {
        console.log("to do -- show error");
      });
    }).catch(error => {
      // Could not make a connection with ADB Service
    });


  }

}
