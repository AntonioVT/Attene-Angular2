import { Component, OnInit } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";
import { ActivatedRoute } from "@angular/router";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { IgdbService } from "app/services/external-services/igdb/igdb.service";
import { Utility } from "app/classes/utility";

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css', '../_shared/interface-thumbnail-section/interface-thumbnail-section.component.css']
})
export class MainGameComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adb: AdbService, private igdb: IgdbService) {
  }

  id: number;
  private sub: any;

  // Game data
  public title: string;
  public summary: string;
  public releaseDate: string;
  public developer: string;
  public website: string;
  public websiteTitle: string;

  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/0',
    'Zelda',
    'Interface', true);
  public sectionFeatured: InterfaceThumbnail[] = [this.test, this.test, this.test, this.test, this.test, this.test, this.test];

  ngOnInit() {
    let vm = this;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      console.log("hola");
      vm.loadAdbGameId(this.id);
    });

  }

  loadAdbGameId(id: number) {
    let vm = this;
    this.adb.getGame(id).then(response => {
      var data = response.json();

      if (data['name']) {
        var date = data['release_date'];
        if(date == null){
          date = 'Release date: TBA';
        }
        var developer = "Developed by " + data['developer'];

        vm.loadGameData(data['name'], data['summary'], date, developer, data['website'], 'Website');
      }
      else {
        vm.loadIGDBGame(data);
      }

    }).catch(error => {
      console.log(error);
    })
  }

  loadIGDBGame(id: number) {
    let vm = this;
    vm.igdb.getGame(id).then(response => {

      var data = response.json();
      if (data && data.length > 0) {
        var info = data[0];
        var devs = data[0].developers;
        if (devs && devs.length > 0) {
          vm.igdb.getDeveloper(devs[0]).then(response => {
            var dev = response.json()[0];

            if(dev){
              var formattedDate = Utility.timestampToDate(info['first_release_date']);
              var developedBy = "Developed by " + dev['name'];
              vm.loadGameData(info['name'], info['summary'], formattedDate, developedBy, info['url'], 'IGDB Website');
            }
            else{
              var formattedDate = Utility.timestampToDate(info['first_release_date']);
              var developedBy = "No developer found";
              vm.loadGameData(info['name'], info['summary'], formattedDate, developedBy, info['url'], 'IGDB Website');
            }

            
          }).catch(error => {
            console.log(error);
          });
        }
      }
    }).catch(error => {
      console.log(error);
    });
  }

  loadGameData(title: string, summary: string, releaseDate: string, developer: string, website: string, websiteTitle: string) {
    this.title = title;
    this.summary = summary;
    this.releaseDate = releaseDate;
    this.developer = developer;
    this.website = website;
    this.websiteTitle = websiteTitle;
    /*
    public title: string;
  public summary: string;
  public releaseDate: string;
  public developer: string;
  public website: string;
  */
  }

}
