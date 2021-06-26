import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../agency';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent implements OnInit {

  agencyModel: Agency = {
    name:'',
    address:'',
    managerId:'',
    customerId: String(localStorage.getItem('customerId')),
    vat:'',
    email:'',
    phone:'',
    certification:'',
    version:1,
    moreInfo:'',
    ids:'',    
  } //('','','','','','','',1,'','AgencytestID','USERTEST');

  constructor(private agencyService:AgencyService, 
    private router:Router, 
    private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  addAgency(){
    this.agencyService.addAgency(this.agencyModel).subscribe(
      (data) => { console.log('Agency Registered', data);
                  this._snackBar.open("Agency Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
                  this.router.navigateByUrl("/agency"); },
      error => { console.log('Failed to Register Agency', error);
                  this._snackBar.open("Failed to Register the Agency", "OK", { duration:3500, panelClass: "error",}); },
      )
      console.warn(this.agencyModel);
    }
    
  saveAgency(){
    this.addAgency();
  }
}