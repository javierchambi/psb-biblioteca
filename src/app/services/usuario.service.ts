import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { Loginform } from '../interfaces/login-from.interface'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any)=> {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }



  crearUsuario( fromData: RegisterForm){

    return this.http.post(`${ base_url }/usuarios`, fromData)
                .pipe(
                  tap( (resp:any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                );
  }

  login( fromData: Loginform){

    return this.http.post(`${ base_url }/login`, fromData)
                .pipe(
                  tap( (resp:any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                );
  }

}
