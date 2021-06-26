import { Component, OnInit } from '@angular/core';
import { TicketService} from '../services/ticket.service';
import { Tickets} from '../tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Router} from '@angular/router';
import { AgencyService } from '../services/agency.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  customerId = localStorage.getItem('customerId');
  creatorId: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;

  ticketModel: Tickets = {
    createdBy: '',
    type: '',
    customerId: String(this.customerId),
    status:'OPENED',
    priority:'',
    agencyId:'',
    description:'',
    ids: '',
    version: 1,
    code:'',
  }
  
  listAgenciasBy: ListadoAgenciasBy[] = [];
  
  valueSelected:any;

  myControl = new FormControl();
  AgencyList: any = [];
  arregloAutocompletar:any = [];

  filteredOptions!: Observable<any[]>;

  customerList: any =[];
  constructor(private ticketService:TicketService,
    private agencyService: AgencyService, private customerService: CustomerService,
    private _snackBar:MatSnackBar, private router:Router) {
    if(localStorage.getItem('id')) {
      this.creatorId = localStorage.getItem('id');
    }
   }
  
  ngOnInit(): void {
    this.getAgencyName();
    this.getCustomerlist();
    this.listadoAgenciasbyName()
    //console.log("customerId al crear ticket: ",this.customerId);
  }


  getCustomerlist(){
    this.customerService.getCustomerList().subscribe(
      clientes => { this.customerList = clientes;
        console.log("lista clientes: ", this.customerList)
      });
  }
  
  getAgencyName(){
    let zrole = localStorage.getItem('zRoleA');
    if (!zrole){
      this.ticketService.getAgencyName(String(this.customerId)).subscribe(agency => {
      this.AgencyList = agency;
      this.arregloAutocompletar = this.AgencyList;
      console.log("Not: ", this.AgencyList);
    });
  } else{
    this.agencyService.getAgencyList().subscribe(data =>
        { this.AgencyList = data;
          this.arregloAutocompletar = this.AgencyList;
          console.log("Yes: ",this.AgencyList);
      });
    } 
  }
    
  filteredString: string = '';
  filter = false;
  filteredResult: any = [];

  onSearchTerm(agency:any){

    const busqueda = agency;
    console.log("data agencia: ",busqueda);


    if (this.valueSelected == 'NAME'){
      let resp: any = this.AgencyList.filter( (option:any) => 
      option.name.toLowerCase().includes(busqueda.toLowerCase()));
      if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      }
      // console.log("respu: ",resp);
    } else if (this.valueSelected =='AAMS'){
      let resp: any = this.AgencyList.filter( (option:any) => 
      option.managerId.includes(busqueda));
      if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      }
    }
  }

  addTicket(){
    this.ticketModel.createdBy = String(localStorage.getItem('id'));
    this.ticketService.addTicket(this.ticketModel).subscribe(
      (data) => { 
        console.log('Ticket Registered', data);
      this._snackBar.open("Ticket Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/tickets"); },
      (error) => { console.log('Failed to Register Ticket', error);
      this._snackBar.open("Failed to Register Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }

  listadoAgenciasbyName() {
    this.listAgenciasBy = [
      { value: 'NAME', viewValue: 'Name' },
      { value: 'AAMS', viewValue: 'AAMS' }];
  }

  consultarListadoAgencias(value:any){
    console.log("Value ",value);
  }

  saveTicket(){
    this.addTicket();
  }
}

interface ListadoAgenciasBy{
  value: string;
  viewValue: string;
}
