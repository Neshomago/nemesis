import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.scss']
})
export class ViewcustomerComponent implements OnInit {

  id: number | undefined;
  edit = false;

  changesCustomer: any = {
    name:'',
    vat: '',
    address: '',
    email: '',
    phone: '',
  }
  constructor(private service: CustomerService, private route:ActivatedRoute, private _snackBar: MatSnackBar,
    private routerReturn:Router) { }

  ngOnInit(): void {
    this.id = +this.getCustomerIndividual(this.route.snapshot.paramMap.get('id'));
  }

  theCustomerData : any = [];
    
  getCustomerIndividual(id:any):any{
    this.service.getCustomerIso(id).subscribe((data)=> {
      this.theCustomerData = data[0];
      this.changesCustomer.name = data[0].name;
      this.changesCustomer.vat = data[0].vat;
      this.changesCustomer.address = data[0].address;
      this.changesCustomer.email = data[0].email;
      this.changesCustomer.phone = data[0].phone;
      console.log('datos clente: ', this.theCustomerData);
    },
    error =>{console.log(error);
    }
    );
  }

  editFields(){
    this.edit = !this.edit;
  }

  updateChanges(id:any){
    this.service.updateCustomer(id, this.changesCustomer).subscribe(
      (data)=>{
        this.theCustomerData.name = this.changesCustomer.name;
      this.theCustomerData.vat = this.changesCustomer.vat;
      this.theCustomerData.address = this.changesCustomer.address;
      this.theCustomerData.email = this.changesCustomer.email;
      this.theCustomerData.phone = this.changesCustomer.phone;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
  }

  erase:any= {
    isDelete: 1
  };
  deleteItem(id:any){
    this.service.deleteCustomer(id, this.erase).subscribe(
      (data)=>{ this.erase = data;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        this.routerReturn.navigateByUrl("/customers");
        console.log(data);
      });
      
  }
}
