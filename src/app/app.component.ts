import { Component } from '@angular/core';
import { NavigationService } from "app/services/local-services/navigation-services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NavigationService]
})
export class AppComponent {
  title = 'app works!';

}
