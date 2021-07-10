import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { UserFirebase } from '../contact';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendmailresetpwd',
  templateUrl: './sendmailresetpwd.component.html',
  styleUrls: ['./sendmailresetpwd.component.scss']
})
export class SendmailresetpwdComponent implements OnInit {

  usuario: any = {
    email: ''
  }

  xemail: any;
  xRequestType: any;
  recordarme = true;

  constructor(private auth: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
/*
    if(this.activatedRoute.snapshot.queryParams["oobCode"] != undefined &&
    this.activatedRoute.snapshot.queryParams["mode"] == "resetPassword"){ 

      let body = {

        oobCode: this.activatedRoute.snapshot.queryParams["oobCode"]
      }

      this.auth.VerifyPasswordResetEmail(body)
      .subscribe(resp => {

        this.xRequestType = resp;

        if(this.xRequestType == "PASSWORD_RESET"){

          this.router.navigateByUrl('/cambiapassword');

        }

      })
    }
  */  

  }

  onSubmit(form: NgForm) {

    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'espere por favor...'
    });
    Swal.showLoading();

    this.auth.SendPasswordResetEmail(this.usuario)
      .subscribe( resp => {
        console.log(resp);

        this.xemail = resp;

        console.log("xemail.email", this.xemail.email);
        console.log("usuario.email", this.usuario.email);
        if(this.xemail.email == this.usuario.email) {

          Swal.fire({
            icon: 'success',
            title: 'Send email reset Password',
            text: 'Check your email to change the password'
          });
  
        }
 
        this.router.navigateByUrl('/login');
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
