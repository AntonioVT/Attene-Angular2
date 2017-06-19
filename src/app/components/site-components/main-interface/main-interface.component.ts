import { Component, OnInit } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";

@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {

  constructor() { }
  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
                                                            '/interface/1',
                                                            'Everyday is Wonderful! Hello Kitty Life Kit',
                                                            'Level Selection', false);
  public tags: string[] = ['Death','Fun','Metal','ASD','XD','JKDLSAJKLDSA KSJDAKLDSA'];
  ngOnInit() {
  }

}
