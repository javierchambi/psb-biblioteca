import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NpagefoundComponent } from './npagefound/npagefound.component';

const routes: Routes = [

  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  //path: '/dashboard' PagesRouting


  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: '**', component: NpagefoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
