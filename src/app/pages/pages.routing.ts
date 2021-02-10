import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
    {path: '', component: DashboardComponent },

  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})
export class PagesRoutingModule{}
