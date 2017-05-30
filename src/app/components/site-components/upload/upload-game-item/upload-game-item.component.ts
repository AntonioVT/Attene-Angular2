import { Component, OnInit, Input } from '@angular/core';
import { UploadGameItem } from "app/classes/upload-game-item";

@Component({
  selector: 'app-upload-game-item',
  templateUrl: './upload-game-item.component.html',
  styleUrls: ['./upload-game-item.component.css']
})
export class UploadGameItemComponent implements OnInit {

  @Input() ugi: UploadGameItem;

  constructor() { }

  ngOnInit() {
  }

  getFormatDate(){
    console.log('???');
    var date = new Date(this.ugi.first_release_date);
    var month = date.getFullYear();
    return month.toString();
  }

  getImageSource(){
    if(this.ugi.imageId)
    return "http://images.igdb.com/igdb/image/upload/t_thumb/" + this.ugi.imageId + ".png";

    return '';
  }

}
