import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TicketService } from '../services/ticket.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  toogleedit = false;
  technicianCount:any = [];
  DataFromUsers:any = [];


  constructor(private user: UsersService, private ticketServ: TicketService) { }

  ngOnInit(): void {
    this.technicians();
    this.getTicketValues();
    this.no_tickets();
    this.getTechnicianNames();
  }

  edit(){
    this.toogleedit = !this.toogleedit;
  }

  technicians(){
    this.user.getTechnicianList().subscribe(
      data =>{ this.technicianCount = data;}
    );
  }

getTechnicianNames(){
  this.user.getUsersData().subscribe(
    data => {
      this.DataFromUsers = data;
      // console.table(this.DataFromUsers);
    }
  );
}

toggleSlide = false;

onChange(value: MatSlideToggleChange){
    this.technicianCount.IsAvailable = value;
    this.DataFromUsers.IsAvailable = value;
}
saveAvailable(){
  let i= 0;
  this.technicianCount.forEach((element:any) => {
    console.log("datos de element: ", element);
    
    if(element.IsAvailable){
      element.IsAvailable = 1;
    }
    else{      element.IsAvailable = 0;    };

    let availability ={
      IsAvailable: element.IsAvailable,
    }
    this.user.technicianUpdateAvailabe(element.bid, availability).subscribe(
      (data) => {console.log("respuesta del suscribe: ",data);
      if (this.technicianCount.length == (i+1)){
        this.getTechnicianNames();
      }
      i++;
  });
});
}

  ticketValueperType:any =[];
  getTicketValues(){
    this.ticketServ.ticketValues().subscribe(
      data => {this.ticketValueperType = data;
      // console.log("TICKET VALUES: ",this.ticketValueperType)
    }
    )
  }


  ValueA = 0;
  ValueB = 0;
  ValueC = 0;
  ValueT = 0;
  TotalAdminInst = 0;
  TotalAdminDis = 0;
  TotalAdminInt = 0;
  TotalTicketsWorked = 0;
  TotalRevenue = 0;
  ticketCount:any;
  NoInsTickets=0;
  NoDisTickets=0;
  NoIntTickets=0;

  no_tickets(){
    let ins = 0;
    let dis = 0;
    let int = 0;
    let adminInst = 0;
    let adminDis = 0;
    let adminInt = 0;
    let revenueAdmin = 0;
    let TicketIns=0;
    let TicketDis=0;
    let TicketInt=0;

  this.ticketServ.getTicketList().subscribe(
  data => {this.ticketCount = data;
    for ( let i = 0; i < this.ticketCount.length; i++) {
      if (this.ticketCount[i].type =='INS'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'INS') {
          ins++;
        }
        adminInst++;
      }
      else if (this.ticketCount[i].type == 'DIS'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'DIS') {
          dis++;
          // console.log("dis technician: "+dis);
        }
        adminDis++;
        // console.log("Total Dis: "+adminDis);
      }
      else if(this.ticketCount[i].type == 'INT'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'INT') {
        int++;
        }
        adminInt++;
    }
    }
    this.NoInsTickets = ins;
    this.NoDisTickets = dis;
    this.NoIntTickets = int;
    TicketIns = ins * 100;
    TicketDis = dis * 50;
    TicketInt = int * 30;
    let Total = TicketInt + TicketDis + TicketIns;
    this.ValueA = TicketIns;
    this.ValueB = TicketDis;
    this.ValueC = TicketInt;
    this.ValueT = Total;
    this.TotalAdminInst = adminInst * 200;
    this.TotalAdminDis = adminDis * 100;
    this.TotalAdminInt = adminInt * 70;
    this.TotalTicketsWorked = this.TotalAdminInst + this.TotalAdminDis + this.TotalAdminInt;
    this.TotalRevenue = this.TotalTicketsWorked - this.ValueT;
  });
  }

}
