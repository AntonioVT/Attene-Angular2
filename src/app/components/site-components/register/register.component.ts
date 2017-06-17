import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { Router } from "@angular/router/";

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

  constructor(public authService: AuthService, public adbService: AdbService, public router: Router) { }

  ngOnInit() {
  }

  register() {

    let vm = this;
    this.adbService.getUserExistence(this.rEmail, this.rUsername).then(function (data) {
      // Get if username & email are available.
      var val = data.text();
      console.log(val);
      // If so, create user in firebase.
      if (val === 'true') {
        // Get the result of creating the user
        var responseFb = vm.authService.registerUser(vm.rEmail, vm.rPassword, vm.rUsername);
        responseFb.then(function (data) {
          // If we succesfully created a firebase user, push relevant data to adb.
          console.log(data);
          var newUserData = {
            Username: vm.rUsername,
            UID: data.uid,
            Email: data.email
          };
          var responseAdb = vm.adbService.setUser(newUserData);
          responseAdb.then(function (data) {
            // Get adb response and redirect.
            console.log(data);
            console.log(data.text());
            vm.router.navigate(['/']);
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(function (error) {
          // failure, mail already used or password error
          // Display error message to the user
          console.log('error in fb response');
          console.log(error["code"]);
        });
      }
      // If not, display error message to the user.
      else {

      }
    });
  }

}
