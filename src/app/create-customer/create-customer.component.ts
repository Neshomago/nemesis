import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../customer';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  
  customerModel = new Customer('','','','','','',1);

  constructor(private customerService:CustomerService, 
    private _snackBar: MatSnackBar, 
    private router:Router) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.customerService.addCustomer(this.customerModel).subscribe(
      (data) => { console.log('Customer Registered', data);
                  this._snackBar.open("Customer Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); 
                  this.router.navigateByUrl("/customers");},
      (error) => { console.log('Failed to Register Ticket', error);
                   this._snackBar.open("Failed to Register Customer", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.customerModel);
   }
 
   saveCustomer(){
     this.addCustomer();
   }
}

