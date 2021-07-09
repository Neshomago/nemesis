import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket.service';
import {AgencyService} from 'src/app/services/agency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MassiveticketsComponent } from './massivetickets/massivetickets.component';
import { tick } from '@angular/core/testing';
import { UsersService } from '../services/users.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private service:TicketService, private agencyService: AgencyService,
    public dialog:MatDialog, private user: UsersService) { }

  strFechaInicio='';
  strFechaFin='';
  TicketList:any=[];
  AgencyList:any=[];
  currentTicket = null;
  currentIndex = -1;
  customerId = localStorage.getItem('customerId');
  zRoleA = localStorage.getItem('RoleA');
  zRoleC = localStorage.getItem('RoleC');
  zRoleE = localStorage.getItem('RoleE');

  public FilterValue: any;
  FilteredResult:any = [];

  technicianCount:any = [];

  customerTicketList: any = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    this.refreshTicketList();
    // this.getCustomerTicketList(this.customerId);
    this.technicians();
  }

  refreshTicketList(){
    if (this.zRoleA == "1" || this.zRoleE =="1"){
      this.service.getTicketList().subscribe(data => 
        {
         this.TicketList=data;
         console.log("ticket data: ", this.TicketList);
         //let result = this.TicketList.map((a:any) => a.creationDate);
         //console.log("solo fechas: ", result);
        })
    } else if (this.zRoleC=="1"){
      this.getCustomerTicketList(this.customerId);
    }
    this.agencyService.getAgencyList().subscribe(agency=>
      {
        this.AgencyList = agency;
        console.log("Agency Data: ", this.AgencyList);
      });
  }

  refresh():void{
    this.refreshTicketList();
    this.currentTicket = null;
    this.currentIndex = -1;
  }

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  openDialogExcelBox(){
    this.dialog.open(MassiveticketsComponent);
  }

  filtering = false;
  onSelectedFilter(){
    this.FilteredResult = this.TicketList.filter(
      (ticket:any) => (ticket.status === this.FilterValue
         || ticket.type == this.FilterValue 
         || ticket.priority == this.FilterValue 
         || ticket.creationDate == this.FilterValue
         || ticket.version >= this.FilterValue
         ));
    this.filtering = true;
    if (this.FilterValue == "clear"){
      this.filtering = false;
      this.FilteredResult = [];
    }
  }

  campoNumericoKey(event:any){
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <=57;
  }

  fechabusqueda = {
    fechainicio:'',
    fechafinal:''
  };

  onSelectedMonth(){
    let fechaInicio = moment(this.strFechaInicio, 'DD-MM-YYYY').format('DD-MM-YYYY');
    let fechaFin    = moment(this.strFechaFin, 'DD-MM-YYYY').format('DD-MM-YYYY');

    this.fechabusqueda.fechainicio = fechaInicio;
    this.fechabusqueda.fechainicio = fechaFin;
    console.log(fechaInicio);
    console.log(fechaFin);
  }

  limpiarFiltro(){
    this.FilterValue = "";
      this.filtering = false;
      this.FilteredResult = [];
  }

  onValueChange(date:Date) {
    var monthData = this.TicketList.filter(
      (x:any) => x.currentDate &&  new Date(x.date).getMonth() == date.getMonth()
    );
    console.log(monthData);
  }

  getFilteredData(){
    console.log("fecha para busqueda: ", this.fechabusqueda)
    this.service.filterByDate(this.fechabusqueda).subscribe(
      resp => { resp = this.fechabusqueda;
      }
    )
  }

  technicians(){
    this.user.getTechnicianList().subscribe(
      data =>{ this.technicianCount = data;
    }
    );
  }

  getCustomerTicketList(customerId_param:any){
    customerId_param = this.customerId;
    this.service.getTicketList_customer(customerId_param).subscribe(
      res => {
        this.TicketList = res;
        console.log("Lista de tickets de cliente: ", this.TicketList);
      }
    )
  }

}
