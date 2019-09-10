import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { ProfileandoptionComponent } from './profileandoption/profileandoption.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { EmployeePrfileComponent } from './employee-prfile/employee-prfile.component';
import { LoaderComponent } from './loader/loader.component';

const appRoutes:Routes=[
{path:'login',component:LoginScreenComponent},
{path:'sidebar',component:SidebarComponent,children:[
  {path:'employeelist',component:EmployeelistComponent,children:[
    {path:'profile',component:ProfileandoptionComponent}
  ]},
  {path:'employeeDetails',component:EmployeePrfileComponent},
  {path:'',redirectTo:'/sidebar',pathMatch:'full'}
]},
{path:'',redirectTo:'/login',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EmployeelistComponent,
    ProfileandoptionComponent,
    LoginScreenComponent,
    EmployeePrfileComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
