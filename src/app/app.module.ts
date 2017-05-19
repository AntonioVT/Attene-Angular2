// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from 'app/app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    UploadComponent
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
  providers: [AuthService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
