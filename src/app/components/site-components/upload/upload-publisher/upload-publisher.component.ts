import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Screenshot } from "app/classes/screenshot";
import { IgdbService } from "app/services/external-services/igdb/igdb.service";
import { UploadGameItem } from "app/classes/upload-game-item";
import { StorageService } from "app/services/external-services/firebase/storage.service";
import { escape } from "querystring";

@Component({
  selector: 'app-upload-publisher',
  templateUrl: './upload-publisher.component.html',
  styleUrls: ['./upload-publisher.component.css', '../upload.component.css']
})
export class UploadPublisherComponent implements OnInit {

  @ViewChild('uploadGameItemsList') private uploadGameItemsContainer: ElementRef;

  screenshotData: Screenshot = new Screenshot();
  uploadGameItems: Array<UploadGameItem> = [];
  showGameItems: boolean = false;
  file: File;

  // byte data
  fileResult: any;
  fileResult1024: any;
  fileResult336: any;

  constructor(public igdb: IgdbService, public strg: StorageService) { }
  timer: any;
  uGameName: string = '';

  ngOnInit() {
  }

  callTimer() {
    clearTimeout(this.timer);
    if (this.uGameName.length == 0) {
      this.resetGameItems();
    }
    else {
      this.timer = setTimeout(this.requestGames, 400, this)
    }
  }

  requestGames(vm: any) {
    if (vm.uGameName.length > 0 && !/^\s*$/.test(vm.uGameName)) {
      var search = vm.igdb.searchGame(vm.uGameName);
      vm.showGameItems = true;
      search.then(function (snapshot) {
        // reset list of games
        vm.resetGameItems();

        // get all games
        var data = snapshot.json();
        data.forEach(function (element) {
          var ugi = new UploadGameItem();
          ugi.id = element.id;
          ugi.name = element.name;

          if (element.cover)
            ugi.imageId = element.cover.cloudinary_id;

          var date = new Date(element.first_release_date);
          var year = date.getFullYear();
          if (isNaN(year))
            ugi.first_release_date = "N/A";
          else
            ugi.first_release_date = year.toString();
          vm.uploadGameItems.push(ugi);
        });
      });
    }
  }

  clearGameName() {
    let vm = this;
    setTimeout(function () {
      vm.showGameItems = false;
    }, 200);
  }

  focusGameName() {
    let vm = this;
    vm.showGameItems = true;
  }

  resetGameItems() {
    this.uploadGameItemsContainer.nativeElement.scrollTop = 0;
    this.uploadGameItems = [];
  }

  selectPublishedGame(gameId: number, gameName: string) {
    this.screenshotData.gameId = gameId;
    this.screenshotData.gameName = gameName;
    this.uGameName = '';
    this.resetGameItems();
  }

  deselectGame() {
    this.screenshotData.gameId = null;
    this.screenshotData.gameName = '';
  }

  // file methods
  onChangeImage(e) {
    this.file = e.currentTarget.files[0];
    this.checkType(this.file);
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
    let vm = this;
    let thumb = <HTMLElement><any>document.querySelector('.js--image-preview'),
      reader = new FileReader();

    reader.onload = function () {
      vm.fileResult = reader.result;
      vm.fileResult1024 = null;
      vm.fileResult336 = null;
      thumb.style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
    thumb.className += ' js--no-default';
  }

  convertImage(size, img) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size / img.width * img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    var result = canvas.toDataURL();
    return result;
  }

  imagesReady() {
    let vm = this;
    if (vm.fileResult && vm.fileResult1024 && vm.fileResult336) {
      console.log('images ready');

      var fileA = vm.dataURLtoFile(vm.fileResult, 'hello.png');
      var fileB = vm.dataURLtoFile(vm.fileResult1024, 'hello2.png');
      var fileC = vm.dataURLtoFile(vm.fileResult336, 'hello3.png');

      vm.strg.uploadScreenshot(fileA, 'hello.png').then(function () {
        vm.strg.getScreenshotUrl('hello.png').then(function (data) {
          console.log(data);
        });
      });

      vm.strg.uploadScreenshot(fileB, 'hello2.png').then(function () {
        vm.strg.getScreenshotUrl('hello2.png').then(function (data) {
          console.log(data);
        });
      });

      vm.strg.uploadScreenshot(fileC, 'hello3.png').then(function () {
        vm.strg.getScreenshotUrl('hello3.png').then(function (data) {
          console.log(data);
        });
      });

    }
    else {
      console.log('wait');
    }
  }

  uploadScreenshot() {
    let vm = this;
    if (vm.fileResult) {
      console.log('Original image loaded');

      var img1024 = new Image();
      img1024.src = vm.fileResult;
      img1024.onload = function () {
        var res = vm.convertImage(1024, img1024);
        vm.fileResult1024 = res;
        vm.imagesReady();
      }

      var img336 = new Image();
      img336.src = vm.fileResult;
      img336.onload = function () {
        var res = vm.convertImage(336, img336);
        vm.fileResult336 = res;
        vm.imagesReady();
      }

    } else {
      console.log('Missing image');
    }

    /*
    let vm = this;
    var fileX = vm.dataURLtoFile(vm.fileResult, 'hello.png');

    vm.strg.uploadScreenshot(fileX, '1').then(function () {
      vm.strg.getScreenshotUrl().then(function (data) {
        console.log(data);
      });
    })

    vm.strg.uploadScreenshot(vm.file, '2').then(function () {
      vm.strg.getScreenshotUrl().then(function (data) {
        console.log(data);
      });
    })*/
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
