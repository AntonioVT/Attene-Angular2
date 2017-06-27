// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from 'app/app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'firebase/storage'; // only import firebase storage

// Components
import { AppComponent } from './app.component';
import { MainNavBarComponent } from './components/navigation-components/navigation-bars/main-nav-bar/main-nav-bar.component';
import { MainSideBarComponent } from './components/navigation-components/navigation-bars/main-side-bar/main-side-bar.component';
import { HomeComponent } from './components/site-components/home/home.component';
import { AuthService } from "app/services/external-services/firebase/auth.service";
import { AngularFireAuthModule } from "angularfire2/auth";
import { LoginComponent } from './components/site-components/login/login.component';
import { RegisterComponent } from './components/site-components/register/register.component';
import { ForgotpasswordComponent } from './components/site-components/forgotpassword/forgotpassword.component';
import { AuthformComponent } from './components/site-components/_shared/authform/authform.component';
import { DatabaseService } from "app/services/external-services/firebase/database.service";
import { NotFoundComponent } from './components/site-components/not-found/not-found.component';
import { UploadComponent } from './components/site-components/upload/upload.component';
import { IgdbService } from "app/services/external-services/igdb/igdb.service";
import { UploadCommunityComponent } from './components/site-components/upload/upload-community/upload-community.component';
import { UploadPublisherComponent } from './components/site-components/upload/upload-publisher/upload-publisher.component';
import { UploadGameItemComponent } from './components/site-components/upload/upload-game-item/upload-game-item.component';
import { StorageService } from "app/services/external-services/firebase/storage.service";
import { AdbService } from "app/services/external-services/adb/adb.service";
import { ActivateComponent } from './components/site-components/activate/activate.component';
import { InterfaceThumbnailComponent } from './components/site-components/_shared/interface/interface-thumbnail/interface-thumbnail.component';
import { MainInterfaceComponent } from './components/site-components/main-interface/main-interface.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { MainGameComponent } from './components/site-components/main-game/main-game.component';
import { InterfaceThumbnailSectionComponent } from './components/site-components/_shared/interface-thumbnail-section/interface-thumbnail-section.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavBarComponent,
    MainSideBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    AuthformComponent,
    NotFoundComponent,
    UploadComponent,
    UploadCommunityComponent,
    UploadPublisherComponent,
    UploadGameItemComponent,
    ActivateComponent,
    InterfaceThumbnailComponent,
    MainInterfaceComponent,
    DropdownDirective,
    MainGameComponent,
    InterfaceThumbnailSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, DatabaseService, IgdbService, StorageService, AdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
