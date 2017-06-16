import { Component, OnInit, Input } from '@angular/core';
import { InterfaceThumbnail } from "app/classes/interface-thumbnail";

@Component({
  selector: 'app-interface-thumbnail',
  templateUrl: './interface-thumbnail.component.html',
  styleUrls: ['./interface-thumbnail.component.css']
})
export class InterfaceThumbnailComponent implements OnInit {

  @Input() it: InterfaceThumbnail;

  constructor() { }

  ngOnInit() {
  }

}
