import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {

  constructor(public db: AngularFireDatabase) { }

  retrieveData(path: string){
    return this.db.database.ref(path).once('value');
  }

}
