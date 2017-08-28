import { Component, OnInit } from '@angular/core';
import { UploadBaseComponent } from "app/components/site-components/upload/upload-base/upload-base.component";
import { UploadGameItem } from "app/classes/upload-game-item";

@Component({
  selector: 'app-upload-community',
  templateUrl: '../upload-base/upload-base.component.html',
  styleUrls: ['../upload-base/upload-base.component.css', '../upload.component.css']
})
export class UploadCommunityComponent extends UploadBaseComponent {

  gameType: string = 'community';
  uploadTitle: string = 'Community Games';
  requestGames(vm: any) {
    if (vm.uGameName.length > 0 && !/^\s*$/.test(vm.uGameName)) {
      var search = vm.adb.searchCommunityGame(vm.uGameName);
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
          console.log(element.id);
          ugi.id = element.id;
          ugi.name = element.name;

          var date = new Date(element.release_Date);
          var year = date.getFullYear();
          if (element.release_Date == null)
            ugi.first_release_date = "TBA";
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
