import { Component, OnInit } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";
import { ActivatedRoute } from '@angular/router';
import { AdbService } from "app/services/external-services/adb/adb.service";
import { Utility } from "app/classes/utility";
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {
  id: number;
  private sub: any;

  // Found interface
  public interfaceAPI: boolean = false;
  public interfaceFound: boolean = true;

  // Interace data
  public gameName: string;
  public category: string;
  public username: string;
  public description: string;
  public publishedUpload: string;
  public views: string;
  public upvotes: string;
  public mediumImageURL: string;
  public originalImageURL: string;
  public gameId: number;

  constructor(private route: ActivatedRoute, private adb: AdbService, private _location: Location) {
  }

  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/0',
    'The Legend of Zelda: Breath of the Wild',
    'Level Selection', false);

  public test2: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/2',
    'The Legend of Zelda: Breath of the Wild',
    'Level Selection', false);
  public tags: string[] = ['Death', 'Fun', 'Metal', 'ASD', 'XD', 'JKDLSAJKLDSA KSJDAKLDSA'];

  ngOnInit() {
    let vm = this;
    vm.resetInterface();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      vm.loadInterface(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

  resetInterface() {
    this.interfaceAPI = false;
    this.interfaceFound = true;
  }

  loadInterface(id: number) {
    let vm = this;
    vm.adb.getScreenshot(id).then(response => {
      vm.loadInterfaceFound(response);
    }).catch(error => {
      vm.loadInterfaceNotFound();
    });
  }

  loadInterfaceFound(response: any) {
    this.interfaceAPI = true;
    console.log(response.json());
    var info = response.json();
    var desc = info['description'];
    if (!desc) {
      desc = 'No description available.';
    }

    var formattedDate = Utility.dateToFormat(info['published_Date']);
    var normalizedText = 'Published on ' + formattedDate + '. Uploaded by ';
    var user = (info['owner']) ? info['owner'] : 'Anonymous';

    this.setInterfaceData(info['game_Name'], info['category'], user,
      desc, normalizedText, info['views'], info['upvotes'], info['tags'],
      info['mediumURL'], info['originalURL'], info['game_ID']);

    // set variables
    this.interfaceFound = true;
    this.interfaceAPI = true;
  }

  loadInterfaceNotFound() {
    // set variables
    this.interfaceFound = false;
    this.interfaceAPI = true;
  }

  setInterfaceData(gameName: string, category: string, username: string, description: string, publishedUpload: string, views: string, upvotes: string, tags: string[], mediumImageURL: string, originalImageURL: string, gameId: number) {
    this.gameName = gameName;
    this.category = category;
    this.username = username;
    this.description = description;
    this.publishedUpload = publishedUpload;
    this.views = views;
    this.upvotes = upvotes;
    this.tags = tags;
    this.mediumImageURL = mediumImageURL;
    this.originalImageURL = originalImageURL
    this.gameId = gameId;
  }

  backClicked() {
    this._location.back();
  }

}
