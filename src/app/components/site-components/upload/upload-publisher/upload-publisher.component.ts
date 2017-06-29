import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Screenshot } from "app/classes/screenshot";
import { IgdbService } from "app/services/external-services/igdb/igdb.service";
import { UploadGameItem } from "app/classes/upload-game-item";
import { StorageService } from "app/services/external-services/firebase/storage.service";
import { escape, unescape } from "querystring";
import { AdbService } from "app/services/external-services/adb/adb.service";

@Component({
  selector: 'app-upload-publisher',
  templateUrl: './upload-publisher.component.html',
  styleUrls: ['./upload-publisher.component.css', '../upload.component.css']
})
export class UploadPublisherComponent implements OnInit {

  @ViewChild('uploadGameItemsList') private uploadGameItemsContainer: ElementRef;

  // Form Data
  screenshotData: Screenshot = new Screenshot();
  uploadGameItems: Array<UploadGameItem> = [];
  gameName: string;

  // Display
  showGameItems: boolean = false;
  isSearchingGame: boolean = false;
  file: File;

  lTagToAdd: String;

  categories: Array<any> = [];
  // byte data
  fileResult: any;
  fileResult1024: any;
  fileResult336: any;

  // Form Data

  constructor(public igdb: IgdbService, public strg: StorageService, public adb: AdbService) {
    this.loadCategories();
  }
  timer: any;
  uGameName: string = '';

  tagActive: boolean = false;
  selectedTagIndex: number = -1;

  ngOnInit() {
  }

  loadCategories() {
    let vm = this;
    this.adb.getCategories().then(function (data) {
      vm.categories = data.json().sort(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });;
    });
  }

  getTagPlaceholder() {
    if (this.screenshotData.ssTags && this.screenshotData.ssTags.length == 0)
      return '(e.g., player, death, landscape)';
    return '';
  }

  getTagActive() {
    if (this.tagActive) {
      return "chip-group-active";
    }
    return "chip-group";
  }

  setTagActive(tagActive: boolean) {
    this.tagActive = tagActive;
    if (!tagActive) {
      this.selectedTagIndex = -1;
    }
  }

  tagToProcess(key) {
    let vm = this;
    if (key == 188 || key == 13) {

      var actualTag = vm.lTagToAdd;
      actualTag = actualTag.replace(/,/g, "").trim();

      if (actualTag && vm.screenshotData.ssTags.indexOf(actualTag) == -1) {
        vm.screenshotData.ssTags.push(actualTag);
        vm.lTagToAdd = '';
      }
    }
    else if (key == 8 && !vm.lTagToAdd) {
      if (!vm.lTagToAdd && vm.selectedTagIndex != -1) {
        vm.screenshotData.ssTags.pop();
        vm.selectedTagIndex = vm.screenshotData.ssTags.length - 1;
      }
      else {
        vm.selectedTagIndex = vm.screenshotData.ssTags.length - 1;
      }
    } else {
      vm.selectedTagIndex = -1;
    }
  }

  removeTag(index) {
    this.screenshotData.ssTags.splice(index, 1);
  }

  callTimer() {
    clearTimeout(this.timer);
    if (this.uGameName.length == 0) {
      this.resetGameItems();
    }
    else {
      this.timer = setTimeout(this.requestGames, 400, this)
      this.isSearchingGame = true;
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
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          var element = data[i];
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
          arr.push(ugi);

          if (element.name.toLowerCase() === vm.uGameName.toLowerCase()) {
            break;
          }
        }

        arr.sort(function (a: any, b: any) {
          var ai = a.name.indexOf(vm.uGameName.toLowerCase());
          var bi = b.name.indexOf(vm.uGameName.toLowerCase());
          if (ai >= 0 && bi < 0) return -1;
          else if (bi >= 0 && ai < 0) return 1;
          else return a.name - b.name;
        });

        vm.uploadGameItems = arr;
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
    this.isSearchingGame = false;
  }

  selectPublishedGame(gameId: number, gameName: string) {
    this.screenshotData.gameId = gameId;
    this.gameName = gameName;
    this.uGameName = '';
    this.resetGameItems();
  }

  deselectGame() {
    this.screenshotData.gameId = null;
    this.gameName = '';
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

      var promiseArray = [];
      promiseArray.push(vm.strg.uploadScreenshot(fileA, 'hello.png'));
      promiseArray.push(vm.strg.uploadScreenshot(fileB, 'hello2.png'));
      promiseArray.push(vm.strg.uploadScreenshot(fileC, 'hello3.png'));


      Promise.all(promiseArray).then(results => {

        var promiseArray2 = [];
        promiseArray2.push(vm.strg.getScreenshotUrl('hello.png'));
        promiseArray2.push(vm.strg.getScreenshotUrl('hello2.png'));
        promiseArray2.push(vm.strg.getScreenshotUrl('hello3.png'));

        Promise.all(promiseArray2).then(results => {
          vm.screenshotData.ssOriginalURL = results[0];
          vm.screenshotData.ssMediumURL = results[1];
          vm.screenshotData.ssThumbnailURL = results[2];
          vm.uploadInterface(vm.screenshotData);
        });

      });

    }
  }

  uploadInterface(ss: Screenshot){
    console.log(ss);
  }

  uploadScreenshot() {
    let vm = this;

    if (vm.screenshotData.gameId && vm.screenshotData.categoryId != -1) {
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
    }
  }

  dataURLtoFile(dataURI, filename) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    var b: any = new Blob([ia], { type: mimeString });
    b.lastModifiedDate = new Date();
    b.name = filename;
    return b;
  }

}
