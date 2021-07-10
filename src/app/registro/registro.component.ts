import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserFirebase } from '../contact';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: UserFirebase = new UserFirebase('','');
  recordarme = true;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
    // Si quiero que en el control * input del html aparezca por default mi correo
    // this.usuario.email = 'fausto.montenegro2007@gmail.com';
  }

  onSubmit(form: NgForm) {

    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if(this.recordarme) {
          localStorage.setItem('xemail', this.usuario.email);
          localStorage.setItem('xpassword', this.usuario.password);
        }
        this.router.navigateByUrl('/registro-user');
      }, (err) => {
        console.log(err.console.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Authenticated error',
          text: err.error.error.message
        });
      });
  }  
}