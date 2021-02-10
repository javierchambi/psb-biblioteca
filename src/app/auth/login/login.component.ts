import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'  ]
})
export class LoginComponent implements OnInit{

  public fromsubmitted = false;

  public loginFrom = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remenber:[false]
  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.usuarioService.login( this.loginFrom.value)
        .subscribe( resp => {

          if( this.loginFrom.get('remenber').value ){
            localStorage.setItem('email', this.loginFrom.get('email').value);
          }else {
            localStorage.removeItem('email');
          }
          //navegar al dashboard
          this.router.navigateByUrl('/');

        }, (err)=>{
          Swal.fire('Error', err.error.msg, 'error');
        });
    //this.router.navigateByUrl('/');
  }

onSuccess ( googleUser ) {
  console. log ( ' Iniciar sesión como:' + googleUser.getBasicProfile().getName());
}
onFailure(error){
  console.log(error);
}

renderButton () {
  gapi . signin2 . render ( 'my-signin2' , {
  'scope' : 'email de perfil' ,
  'width' : 240 ,
  'height' : 50 ,
  'longtitle' : true ,
  'theme' : 'dark' ,
  'onsuccess' : this.onSuccess ,
  'onfailure' : this.onFailure
});

}
}
