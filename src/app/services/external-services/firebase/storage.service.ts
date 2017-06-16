import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class StorageService {

  constructor(public app: FirebaseApp) {
  }

  uploadScreenshot(file, name){
    // thumbnail, medium ,original
    return this.app.storage().ref().child('screenshot/thumbnail/' + name).put(file);
  }

  getScreenshotUrl(name){
    return this.app.storage().ref().child('screenshot/thumbnail/' + name).getDownloadURL();
  }

}
