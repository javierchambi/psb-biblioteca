import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

   public fromsubmitted = false;

  public registerFrom = this.fb.group({
    nombre: ['javier', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ true, Validators.required],

  },{
    validators: this.passwordIguales('password','password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router:Router) { }

  crearUsuario(){
    this.fromsubmitted = true;
    console.log( this.registerFrom.value);

    if( this.registerFrom.invalid){
      return;
    }
    //si no es invaido el formulario realizar el posteo
    this.usuarioService.crearUsuario(this.registerFrom.value)
      .subscribe( resp =>{
        //navegar al dashboard
        this.router.navigateByUrl('/');
      }, (err)=> {
        //si sucede un error
        Swal.fire('error',err.error.msg,'error');

      } );

  }

  campoNoValido(campo: string):boolean{

    if( this.registerFrom.get(campo).invalid && this.fromsubmitted){
      return true;
    }else{
      return false;
      }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerFrom.get('password').value;
    const pass2 = this.registerFrom.get('password2').value;

    if( (pass1 !== pass2) && this.fromsubmitted){
      return true;
    } else {
      return false;
    }

  }

  aceptarTerminos(){
    return !this.registerFrom.get('terminos').value && this.fromsubmitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string){

    return (fromGroup: FormGroup) => {
      const pass1Control = fromGroup.get(pass1Name);
      const pass2Control = fromGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else {
        pass2Control.setErrors({noEsIgual: true})

    }
  }
}
}
