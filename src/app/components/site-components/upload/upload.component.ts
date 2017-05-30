import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IgdbService } from "app/services/external-services/igdb/igdb.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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

  uGameName: string;

  constructor(private igdb: IgdbService) { }

  ngOnInit() {

  }

  testApi() {
    this.igdb.searchGame(this.uGameName);
  }

  // community

  // published
  selectGame(gameId: number, gameName: string) {
    this.gameSelected = true;
    this.uploadData.gameId = gameId;
    this.uploadData.gameName = gameName;
  }

}
