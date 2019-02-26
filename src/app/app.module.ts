import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { EdittaskComponent } from './UI/edittask/edittask.component';
import { SearchtaskComponent } from './UI/searchtask/searchtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './route';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { SignupComponent } from './signup/signup.component';



@NgModule({
 
  declarations: [
    AppComponent,
    AddtaskComponent,
    EdittaskComponent,
    SearchtaskComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

