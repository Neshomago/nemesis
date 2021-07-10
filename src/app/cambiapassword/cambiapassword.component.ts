import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserFirebase } from '../contact';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-cambiapassword',
  templateUrl: './cambiapassword.component.html',
  styleUrls: ['./cambiapassword.component.scss']
})

export class CambiapasswordComponent implements OnInit {

  // usuario: UserFirebase = new UserFirebase('','');
  
  usuario:  any = {
    password: ''
  }

  recordarme = true;


  constructor(private auth: AuthService,
              private router: Router,
              private usersService: UsersService,
              private route:ActivatedRoute,) { }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    //this.usuario.email = "";
    //this.usuario.password = "";
  }

  onSubmit(form: NgForm) {

    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'espere por favor...'
    });
    Swal.showLoading();

    this.auth.cambiaPassword(this.usuario)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if(this.recordarme) {
          localStorage.setItem('xemail', this.usuario.email);
          localStorage.setItem('xpassword', this.usuario.password);
        }

        this.usersService.changeUserPassword(this.usuario)
        .subscribe( resp1 => {
          console.log(resp1);
          Swal.close();          
        })
        this.router.navigateByUrl('/contact');
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
