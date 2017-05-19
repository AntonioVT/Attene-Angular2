import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // menu variables
  gameType: string = 'community';
  // file variables
  originalFile: any;

  // upload data
  gameSelected: boolean = false;
  uploadData: any = {
    gameId: null,
    gameName: null,
    categoryId: null,
    ssTitle: null,
    ssDescription: null,
    ssTags: null
  }

  constructor() { }

  ngOnInit() {

  }

  // upload menu methods
  setGameType(gameType: string) {
    if (gameType == 'published' || gameType == 'community' || gameType == null) {
      this.gameType = gameType;
    }
  }

  // community

  // published
  selectGame(gameId: number, gameName: string) {
    this.gameSelected = true;
    this.uploadData.gameId = gameId;
    this.uploadData.gameName = gameName;
  }

  // file methods
  onChangeImage(e) {
    let file = e.currentTarget.files[0];
    this.checkType(file);
  }

  checkType(file) {
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      throw 'Datei ist kein Bild';
    } else if (!file) {
      throw 'Kein Bild gewählt';
    } else {
      this.previewImage(file);
    }
  }

  previewImage(file) {
    let thumb = <HTMLElement><any>document.querySelector('.js--image-preview'),
      reader = new FileReader();

    reader.onload = function () {
      thumb.style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
    thumb.className += ' js--no-default';
  }


}
