import { SharedService } from './Services/shared.service';
import { Http , HttpModule , Response} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { EdittaskComponent } from './UI/edittask/edittask.component';
import { SearchtaskComponent } from './UI/searchtask/searchtask.component';
import { LoginComponent } from './login/login.component';
import {  SignupComponent  } from './signup/signup.component';

  export const appRoutes:Routes=[
    {path:'Add',component:AddtaskComponent},
    {path:'Edit/:un',component:EdittaskComponent},
    {path:'Search',component:SearchtaskComponent},
    {path:'',component:SearchtaskComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    
   ]