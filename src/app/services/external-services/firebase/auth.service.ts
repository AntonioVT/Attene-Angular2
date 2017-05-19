import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatabaseService } from "app/services/external-services/firebase/database.service";

@Injectable()
export class AuthService {

  constructor(public afa: AngularFireAuth, public databaseService: DatabaseService) {
  }

  loginWithMail(email: string, password: string) {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afa.auth.signOut();
  }

  getAuthenticatedUser() {
    return this.afa.auth.currentUser;
  }

  registerUser(email: string, password: string, username: string) {
    var vm = this;
    this.databaseService.retrieveData('users/' + username.toLocaleLowerCase()).then(function (snapshot) {
      if (snapshot.val() == null) {
        // successful 
        vm.afa.auth.createUserWithEmailAndPassword(email, password)
          .then((data) => {
            console.log(data);
          })
          // failure, mail already used or password error
          .catch(function (error) {
            console.log(error["code"])
          });
      }
      else {
        console.log('Username already taken.')
      }
    });

  }

}
