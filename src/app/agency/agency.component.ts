import { Component, OnInit } from '@angular/core';
import {AgencyService} from 'src/app/services/agency.service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  
  constructor(private service: AgencyService) { }
  
  AgencyList:any=[];

  customerId = localStorage.getItem('customerId');
  zRoleA = localStorage.getItem('RoleA');
  zRoleE = localStorage.getItem('RoleE');
  zRoleC = localStorage.getItem('RoleC');

  currentAgency = null;
  currentIndex = -1;
  
  public FilterValue: any;
  filter = false;
  filteredString: string = '';

  ngOnInit(): void {
    this.refreshAgencyList();
  }

  refreshAgencyList(){
    if (this.zRoleA == "1" || this.zRoleE =="1"){
      this.service.getAgencyList().subscribe(data => 
        {
         this.AgencyList = data; 
        })
    } else (this.zRoleC == "1")
      this.service.getCustomerAgencyList(this.customerId).subscribe
      (data => {
        this.AgencyList = data; 
      });
    }

  setCurrentAgency(agency:any, index:any): void{
    this.currentAgency = agency;
    this.currentIndex = index;
  }

  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.AgencyList.filter(
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
