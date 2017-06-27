import { Component, OnInit } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css', '../_shared/interface-thumbnail-section/interface-thumbnail-section.component.css']
})
export class MainGameComponent implements OnInit {

  constructor() { }
  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/0',
    'Zelda',
    'Interface', true);
  public sectionFeatured: InterfaceThumbnail[] = [this.test, this.test, this.test, this.test, this.test, this.test, this.test];
  ngOnInit() {
  }

}
