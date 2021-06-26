import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';

import { UsuarioModel } from '../contact';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss']
})
export class RegistroUserComponent implements OnInit {

  nuevousuario: UsuarioModel = new UsuarioModel('','','','','','', 1);
  recordarme = false;

  RoleA:boolean = false;
  RoleE:boolean = false;
  RoleC:boolean = false;
  RoleT:boolean = false;
  
  userRole: Array<String> = ['ADMIN', 'TECH', 'CUSTOMER', 'WAREHOUSE'];
  userComprobar:any ={
    user_name: ''
  }

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    // Si quiero que en el contro input del html aparezca por default mi correo
    // this.usuario.email = 'fausto.montenegro2007@gmail.com';
  }

  comprobarUser(username:UsuarioModel){
    this.userService.getUserCheck(username).subscribe(
      data => { this.userComprobar = data;
        console.log(this.userComprobar)
      }
    );
  }

  onSubmit(form: NgForm) {

    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'espere por favor...'
    });
    Swal.showLoading();

    this.nuevousuario.id = 0;

    if(localStorage.getItem('xemail')) {
      this.nuevousuario.email = localStorage.getItem('xemail');
    } else {
      this.nuevousuario.email = '';
    }

    if(localStorage.getItem('xpassword')) {
      this.nuevousuario.password = localStorage.getItem('xpassword');
    } else {
      this.nuevousuario.password = '';
    }

    if(this.RoleA) {
      this.nuevousuario.RoleA = '1';
    } else {
      this.nuevousuario.RoleA = '0';
    }

    if(this.RoleC) {
      this.nuevousuario.RoleC = '1';
    } else {
      this.nuevousuario.RoleC = '0';
    }

    if(this.RoleE) {
      this.nuevousuario.RoleE = '1';
    } else {
      this.nuevousuario.RoleE = '0';
    }

    if(this.RoleT) {
      this.nuevousuario.RoleT = '1';
    } else {
      this.nuevousuario.RoleT = '0';
    }

    console.log('Usuario: ', this.nuevousuario);
    this.userService.addUser(this.nuevousuario)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        this.router.navigateByUrl('/create-contact');
    }, (err) => {
        console.log(err.console.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Authenticated error # 1',
          text: err.error.error.message
        });
    });
  }
}  


