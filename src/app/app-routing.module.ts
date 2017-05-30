import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/components/site-components/home/home.component";
import { LoginComponent } from "app/components/site-components/login/login.component";
import { RegisterComponent } from "app/components/site-components/register/register.component";
import { ForgotpasswordComponent } from "app/components/site-components/forgotpassword/forgotpassword.component";
import { NotFoundComponent } from "app/components/site-components/not-found/not-found.component";
import { UploadComponent } from "app/components/site-components/upload/upload.component";
import { UploadCommunityComponent } from "app/components/site-components/upload/upload-community/upload-community.component";
import { UploadPublisherComponent } from "app/components/site-components/upload/upload-publisher/upload-publisher.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'passwordrecovery', component: ForgotpasswordComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'upload/c', component: UploadCommunityComponent },
    { path: 'upload/p', component: UploadPublisherComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}