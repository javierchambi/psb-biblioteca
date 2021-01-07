import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NpagefoundComponent } from './pages/npagefound/npagefound.component';
import { PagesComponent } from './pages/pages.component'

const routes: Routes = [
  {path: '', component: PagesComponent,
  children:[
    {path: 'dashboard', component: DashboardComponent },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  ]
  },



  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},


  {path: '**', component: NpagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
