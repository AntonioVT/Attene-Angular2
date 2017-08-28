import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Screenshot } from "app/classes/screenshot";
import { IgdbService } from "app/services/external-services/igdb/igdb.service";
import { UploadGameItem } from "app/classes/upload-game-item";
import { StorageService } from "app/services/external-services/firebase/storage.service";
import { escape, unescape } from "querystring";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { UploadBaseComponent } from "app/components/site-components/upload/upload-base/upload-base.component";

@Component({
  selector: 'app-upload-publisher',
  templateUrl: '../upload-base/upload-base.component.html',
  styleUrls: ['../upload-base/upload-base.component.css', '../upload.component.css']
})
export class UploadPublisherComponent extends UploadBaseComponent {

  gameType: string = 'published';
  uploadTitle: string = 'Published Games';

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

}
