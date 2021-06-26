import { Component, OnInit } from '@angular/core';
import {CustomerService} from 'src/app/services/customer.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor( private customerService: CustomerService,  private fb:FormBuilder) { }

  CustomerList: any =[];

  currentCustomer = null;
  currentIndex = -1;

  public FilterValue: any;
  filter = false;
  filteredString: string = '';

  ngOnInit(): void {
  this.refreshCustomerList();    
  }

  refreshCustomerList(){
    this.customerService.getCustomerList().subscribe(
      data =>{
        this.CustomerList = data
      }
    );
  }

  setCurrentCustomer(customer:any, index:any): void{
    this.currentCustomer = customer;
    this.currentIndex = index;
  }

  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.CustomerList.filter(
      (item:any) => item.name.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);
        if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      } else (resp == "" || resp == null || resp == undefined || resp == []); {
        this.filter = false;
        this.filteredResult = [];
      }
  }

}
