import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket.service';
import {AgencyService} from 'src/app/services/agency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-viewtickettech',
  templateUrl: './viewtickettech.component.html',
  styleUrls: ['./viewtickettech.component.scss']
})
export class ViewtickettechComponent implements OnInit {

  TicketList:any=[];
  AgencyList:any=[];
  currentTicket = null;
  currentIndex = -1;

  xRoleA: boolean = false;
  xRoleC: boolean = false; 
  xRoleE: boolean = false;
  xRoleT: boolean = false;
  nombre: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;
  iniciales:any;
  surname: any;

  techId = localStorage.getItem('bid');

  theTicketData : any;

  constructor(private service:TicketService, private agencyService: AgencyService,
    private userService:UsersService, public dialog:MatDialog, private _snackBar: MatSnackBar)
    {  
      if(localStorage.getItem('zRoleA')) { this.zRoleA = localStorage.getItem('zRoleA'); }

      if(localStorage.getItem('zRoleC')) { this.zRoleC = localStorage.getItem('zRoleC'); }

      if(localStorage.getItem('zRoleE')) { this.zRoleE = localStorage.getItem('zRoleE'); }
      
      if(localStorage.getItem('zRoleT')) { this.zRoleT = localStorage.getItem('zRoleT');}
    
      if(localStorage.getItem('nombre')) { this.nombre = localStorage.getItem('nombre');}
    
      if(localStorage.getItem('surname')) { this.surname = localStorage.getItem('surname');}
     }

  public FilterValue: any;
  FilteredResult:any = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    this.refreshTicketList();
    this.Technicians_List();
    console.log(this.techId);
  }

  refreshTicketList(){
    this.service.getTicketList().subscribe(data => 
      {
       this.TicketList=data;
      }),
    this.agencyService.getAgencyList().subscribe(agency=>
      {
        this.AgencyList = agency;
      });
  }

  TechnicianList:any=[];
  Technicians_List(){
    this.userService.getTechnicianList().subscribe(
      data => {this.TechnicianList = data;} );
  }

  refresh():void{
    this.refreshTicketList();
    this.currentTicket = null;
    this.currentIndex = -1;
  }

  refreshPage() {
    setTimeout(
      function(){ window.location.reload();}, 2000);
  }

  TicketReject(id: any){
    const version = {
      tech_assign: '',
      version: 4,
      status: 'WORKING',
    };
    this.service.updateTicketReject(id, version).subscribe(
      (data) => { this.theTicketData.version = 4;
        this._snackBar.open("Ticket has been returned.", "OK",
        { duration:3500, panelClass: "success",});
      });
  }

  TicketAccept(id: any){
    const version = {
      version: 7,
      status: 'WORKING',
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 7;
        this._snackBar.open("Ticket has been accepted.", "OK",
        { duration:3500, panelClass: "success",});
    });
  }

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  filtering = false;
  onSelectedFilter(){
    this.FilteredResult = this.TicketList.filter(
      (ticket:any) => (ticket.status === this.FilterValue
        || ticket.type == this.FilterValue
        || ticket.priority == this.FilterValue));
    this.filtering = true;
    if (this.FilterValue == "clear"){
      this.filtering = false;
      this.FilteredResult = [];
    }
  }

  limpiarFiltro(){
    this.FilterValue == "";
      this.filtering = false;
      this.FilteredResult = [];
  }
}
