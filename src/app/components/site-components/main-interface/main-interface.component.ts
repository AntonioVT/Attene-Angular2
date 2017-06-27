import { Component, OnInit } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.css']
})
export class MainInterfaceComponent implements OnInit {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {
  }

  public test: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/1',
    'The Legend of Zelda: Breath of the Wild',
    'Level Selection', false);

  public test2: InterfaceThumbnail = new InterfaceThumbnail('https://static.pressakey.de/gfxheader/320px/The-Legend-of-Zelda-Breath-of-the-Wild-Review-1703.jpg',
    '/interface/2',
    'The Legend of Zelda: Breath of the Wild',
    'Level Selection', false);
  public tags: string[] = ['Death', 'Fun', 'Metal', 'ASD', 'XD', 'JKDLSAJKLDSA KSJDAKLDSA'];
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

}
