import { Component, OnInit } from '@angular/core';
import { TicketService} from '../services/ticket.service';
import { Tickets} from '../tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Router} from '@angular/router';
import { AgencyService } from '../services/agency.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
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

  itemCtrl: FormControl = new FormControl();
  itemFilterCtrl: FormControl = new FormControl();
  filteredCustomer:ReplaySubject<ListadoCustomers[]> = new ReplaySubject<ListadoCustomers[]>(1);
  itemCtrlName: FormControl = new FormControl();
  itemFilterCtrlName: FormControl = new FormControl();
  filteredItemName:ReplaySubject<listadoAgenciasName[]> = new ReplaySubject<listadoAgenciasName[]>(1);
  itemCtrlAMS: FormControl = new FormControl();
  itemFilterCtrlAMS: FormControl = new FormControl();
  filteredItemAMS:ReplaySubject<listadoAgenciasAMS[]> = new ReplaySubject<listadoAgenciasAMS[]>(1);
  protected _onDestroy = new Subject<void>();
  
  listAgenciasBy: ListadoAgenciasBy[] = [];
  arrayListAgencias:any[]=[];
  arrayListadoAgenciasNombre:listadoAgenciasName[]=[];
  arrayListAgenciasams:any[]=[];
  arrayListadoAgenciasAMS:listadoAgenciasAMS[]=[];
  arrayListCustomers:any[]=[];
  arrayListadoCustomers:ListadoCustomers[]=[];

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
    //this.getAgencyName();
    //this.getCustomerlist();
    this.listadoAgenciasby();
    this.getAgencyList();
    this.getAgencyAMSList();
    this.getCustomersToSelectAgency();
    //console.log("customerId al crear ticket: ",this.customerId);
  }

    ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getAgencyList(){
    let zrole = localStorage.getItem('zRoleA');
    if (!zrole){
      this.ticketService.getAgencyName(String(this.customerId)).subscribe(
        response => {
            this.arrayListAgencias = response.map((i:any) =>({value:i.id,viewValue:i.name}));
            this.arrayListadoAgenciasNombre = this.arrayListAgencias;
  
            this.filteredItemName.next(this.arrayListadoAgenciasNombre.slice());
            this.itemFilterCtrlName.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterAgenciasNombre();});
      });
    } else {
      this.ticketService.getAgencyList().subscribe(
        response => {
            this.arrayListAgencias = response.map((i:any) =>({value:i.id,viewValue:i.name}));
            this.arrayListadoAgenciasNombre = this.arrayListAgencias;
    
            this.filteredItemName.next(this.arrayListadoAgenciasNombre.slice());
            this.itemFilterCtrlName.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterAgenciasNombre();});
      });
    }
  }

  getAgencyAMSList(){
    let zrole = localStorage.getItem('zRoleA');
    if (!zrole){
      this.ticketService.getAgencyName(String(this.customerId)).subscribe(
        response => {
            this.arrayListAgenciasams = response.map((i:any) =>({value:i.certification,viewValue:'AMMS: '+i.certification+' | '+i.name}));
            this.arrayListadoAgenciasAMS = this.arrayListAgenciasams;

            this.filteredItemAMS.next(this.arrayListadoAgenciasAMS.slice());
            this.itemFilterCtrlAMS.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterAgenciasAMS();});
      });
    } else {
      this.ticketService.getAgencyList().subscribe(
        response => {
            this.arrayListAgenciasams = response.map((i:any) =>({value:i.certification,viewValue:'AMMS: '+i.certification+' | '+i.name}));
            this.arrayListadoAgenciasAMS = this.arrayListAgenciasams;

            this.filteredItemAMS.next(this.arrayListadoAgenciasAMS.slice());
            this.itemFilterCtrlAMS.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterAgenciasAMS();});
      });
    }
  }

  getCustomersToSelectAgency(){
    this.customerService.getCustomerList().subscribe(
      response => {
          this.arrayListCustomers = response.map((i:any) =>({value:i.id,viewValue:i.name}));
          this.arrayListadoCustomers = this.arrayListCustomers;
  
  
          this.filteredCustomer.next(this.arrayListadoCustomers.slice());
          this.itemFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
          this.filterCustomers();
      });
    });
  }

  filterAgenciasNombre() 
  {
    if (!this.arrayListadoAgenciasNombre) 
    {
      return;
    }
    let search = this.itemFilterCtrlName.value;
    if (!search) 
    {
      this.filteredItemName.next(this.arrayListadoAgenciasNombre.slice());
      return;
    } 
    else 
    {
      search = search.toLowerCase();
    }
    this.filteredItemName.next(
      this.arrayListadoAgenciasNombre.filter(i => i.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }

  filterAgenciasAMS() 
  {
    if (!this.arrayListadoAgenciasAMS) 
    {
      return;
    }
    let search = this.itemFilterCtrlAMS.value;
    if (!search) 
    {
      this.filteredItemAMS.next(this.arrayListadoAgenciasAMS.slice());
      return;
    } 
    else 
    {
      search = search.toLowerCase();
    }
    this.filteredItemAMS.next(
      this.arrayListadoAgenciasAMS.filter(i => i.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }

  filterCustomers() 
  {
    if (!this.arrayListadoCustomers) 
    {
      return;
    }
    let search = this.itemFilterCtrl.value;
    if (!search) 
    {
      this.filteredCustomer.next(this.arrayListadoCustomers.slice());
      return;
    } 
    else 
    {
      search = search.toLowerCase();
    }
    this.filteredCustomer.next(
      this.arrayListadoCustomers.filter(i => i.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }


  getCustomerlist(){
    this.customerService.getCustomerList().subscribe(
      clientes => { this.customerList = clientes;
        console.log("lista clientes: ", this.customerList)
      });
  }
  
  // getAgencyName(){
  //   let zrole = localStorage.getItem('zRoleA');
  //   if (!zrole){
  //     this.ticketService.getAgencyName(String(this.customerId)).subscribe(agency => {
  //     this.AgencyList = agency;
  //     this.arregloAutocompletar = this.AgencyList;
  //     console.log("Not: ", this.AgencyList);
  //   });
  // } else{
  //   this.agencyService.getAgencyList().subscribe(data =>
  //       { this.AgencyList = data;
  //         this.arregloAutocompletar = this.AgencyList;
  //         console.log("Yes: ",this.AgencyList);
  //     });
  //   } 
  // }
    
  filteredString: string = '';
  filter = false;
  filteredResult: any = [];

  onSearchTerm(agency:any){

    const busqueda = agency;
    console.log("data agencia: ",busqueda);


    if (this.valueSelected == 'NAME' || this.valueSelected == ''){
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
    if (this.valueSelected == 'NAME'){
      this.ticketModel.agencyId = this.itemCtrlName.value;
    } else if (this.valueSelected == 'AAMS'){
      this.ticketModel.agencyId = this.itemCtrlName.value;
    }
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

  listadoAgenciasby() {
    this.listAgenciasBy = [
      { value: 'NAME', viewValue: 'Name' },
      { value: 'AAMS', viewValue: 'AAMS' }];
  }

  saveTicket(){
    this.addTicket();
  }
}

interface ListadoAgenciasBy{
  value: string;
  viewValue: string;
}

interface listadoAgenciasName{
  value: string;
  viewValue: string;
}

interface listadoAgenciasAMS{
  value: string;
  viewValue: string;
}

interface ListadoCustomers{
  value: string;
  viewValue: string;
}