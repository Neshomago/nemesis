import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel, UserFirebase } from '../contact';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UserFirebase = new UserFirebase('', '');
  usermodel: UsuarioModel = new UsuarioModel('','','','','','', 1)
  recordarme = true;
  visibility: boolean = true;
  logueado: any;

  constructor(private auth: AuthService,
              private router: Router,
              private userService: UsersService) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.usuario.password = localStorage.getItem('password');
      this.recordarme = false;
      this.router.navigateByUrl('/main');
    }
  }

  login(form: NgForm) {

    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Please Wait...'
    });
    Swal.showLoading();

    console.log('Email: ', this.usuario.email);
    console.log('Passw: ', this.usuario.password);

    this.auth.login(this.usuario)
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if(this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
          localStorage.setItem('password', this.usuario.password);
        }

      let elemail = {
         usermail: this.usuario.email,
      };
      this.userService.getUserCheck(elemail)
        .subscribe( xresp => {
          console.log('Base de datos: ', xresp);
          if(xresp['email']==this.usuario.email) {
            localStorage.setItem('id', xresp['id']);
            localStorage.setItem('bid', xresp['bid']);
            localStorage.setItem('RoleA', xresp['RoleA']);
            localStorage.setItem('RoleC', xresp['RoleC']); 
            localStorage.setItem('RoleE', xresp['RoleE']);
            localStorage.setItem('RoleT', xresp['RoleT']);
            localStorage.setItem('nombre', xresp['name']);
            localStorage.setItem('surname', xresp['surname']);
            localStorage.setItem('address', xresp['address']);
            localStorage.setItem('phone', xresp['phone']);
            localStorage.setItem('customerId', xresp['customerId']);
            this.logueado = 'si';
            localStorage.setItem('logueado', this.logueado);
            this.userService.publishSomeData({
              email: this.usuario.email,
              RoleA: xresp['RoleA'],
              RoleC: xresp['RoleC'],
              RoleE: xresp['RoleE'],
              RoleT: xresp['RoleT'],
              nombre: xresp['name'],
              surname: xresp['surname'],
              address: xresp['address'],
              phone: xresp['phone']
            }); 
            this.router.navigateByUrl('/main');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Authenticated error',
              text: 'invalid User'
            });
          }
          
      });
  
        //this.visibility = !this.visibility;
        //return this.router.navigate(['']);
          
    }, (err) => {
    
        Swal.fire({
          icon: 'error',
          title: 'Authenticated error',
          text: err.error.error.message
        });
    
    });


  }

}
