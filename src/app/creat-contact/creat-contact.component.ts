import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Contact } from '../contact';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-creat-contact',
  templateUrl: './creat-contact.component.html',
  styleUrls: ['./creat-contact.component.scss']
})
export class CreatContactComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar, private contactService: UsersService, private router: Router, private customerService: CustomerService) { }

  contactModel: any =
  // {
  //   name:'',
  //   surname:'',
  //   taxCode:'',
  //   address:'',
  //   phone:'',
  //   email:'',
  //   customerId:0,
  //   version:1,
  //   id:undefined,
  //   userId:undefined,
  // };
  new Contact('','','','','','','',1,1,1);
  
  customerList: any =[];

  ngOnInit(): void {
    this.getCustomerList();
    if(localStorage.getItem('xemail')) {
      this.contactModel.email = localStorage.getItem('xemail');
    } else {
      this.contactModel.email = '';
    }
  }

  
  addContact(){
    this.contactService.addContact(this.contactModel).subscribe(
      (data) => { console.log('Contact Registered', data);
      this._snackBar.open("Contact Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); },
      error => { console.log('Failed to Register Contact', error);
      this._snackBar.open("Failed to Register the Contact", "OK", { duration:3500, panelClass: "error",}); }
      )
      console.warn(this.contactModel);
    }
    
    saveContact(){
      this.addContact();
      this.router.navigateByUrl('/contact');
    }
    
    getCustomerList(){
      this.customerService.getCustomerList().subscribe(
        data => {this.customerList = data;
        console.table(this.customerList);}
      );
    }
}