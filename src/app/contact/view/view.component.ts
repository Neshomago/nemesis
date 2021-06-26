import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

import { UsuarioModel } from '../../contact';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id: number | undefined;
  edit = false;
  //constructor(private service: UsersService, private route:ActivatedRoute,  private _snackBar: MatSnackBar) { }
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



  constructor(private service: UsersService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.id = +this.getContactIndividual(this.route.snapshot.paramMap.get('id')); 
  }
  
  theUserData : any = [];
  
    changes: any = {
      name:'',
      surname:'',
      taxCode: '',
      address: '',
      email: '',
      phone: '',
    }
  
    loginData:any ={};
    idUser:any = {
      id: 0
    };

    passwordModel:any={
      id:0,
      password:'',
      RoleA:'',
      RoleC:'',
      RoleE:'',
      RoleT:'',
      email:''
    }  
  getContactIndividual(id:any):any{
    this.service.getContactIso(id).subscribe((data)=> {
      this.theUserData = data[0];
      this.changes.name = data[0].name;
      this.changes.surname = data[0].surname;
      this.changes.taxCode = data[0].taxCode;
      this.changes.address = data[0].address;
      this.changes.email = data[0].email;
      this.changes.phone = data[0].phone;
      this.idUser.id = data[0].bid;
      console.log('data user: ', this.theUserData);
      this.service.getUsertoUpdate(this.idUser.id).subscribe(
        ((dataObtained:any) => { this.loginData = dataObtained;
          this.passwordModel.id = dataObtained[0].id;
          this.passwordModel.password = dataObtained[0].password;
          this.passwordModel.RoleA = dataObtained[0].RoleA;
          this.passwordModel.RoleC = dataObtained[0].RoleC;
          this.passwordModel.RoleE = dataObtained[0].RoleE;
          this.passwordModel.RoleT = dataObtained[0].RoleT;
          this.passwordModel.email = dataObtained[0].email;
          console.log("datos login: ", this.loginData)})
      );
      console.log('data user: ', this.theUserData);
      this.service.getUserCheck(this.changes.email).subscribe(
        (data)=>{
          console.log('another user request: ', data);
        })
    },
    error =>{console.log(error);
    }
    );
  }

  editFields(){
    this.edit = !this.edit;
  }

  updateChanges(id:any){
    this.service.updateContact(id, this.changes).subscribe(
      (data)=>{
        this.theUserData.name = this.changes.name;
        this.theUserData.surname = this.changes.surname;
        this.theUserData.taxCode = this.changes.taxCode;
        this.theUserData.address = this.changes.address;
        this.theUserData.email = this.changes.email;
        this.theUserData.phone = this.changes.phone;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
      });
      this.updatePasswordRole();
  }

  updatePasswordRole(){
    let theId = this.passwordModel.id;
    console.log(theId);
    console.log(this.passwordModel);
    this.service.UpdatePasswordAndRole(theId, this.passwordModel).subscribe(
      data =>{
        data = this.passwordModel;
      }
    )
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
    this.service.addUser(this.nuevousuario)
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
