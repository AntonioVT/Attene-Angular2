import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainNavBarComponent } from './components/navigation-components/navigation-bars/main-nav-bar/main-nav-bar.component';
import { MainSideBarComponent } from './components/navigation-components/navigation-bars/main-side-bar/main-side-bar.component';
import { HomeComponent } from './components/site-components/home/home.component';
import { AppRoutingModule } from "app/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    MainNavBarComponent,
    MainSideBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
