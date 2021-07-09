import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserFirebase } from '../contact';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-cambiapassword',
  templateUrl: './cambiapassword.component.html',
  styleUrls: ['./cambiapassword.component.scss']
})

export class CambiapasswordComponent implements OnInit {

  usuario: UserFirebase = new UserFirebase('','');
  recordarme = true;


  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
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
