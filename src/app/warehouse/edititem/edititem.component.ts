import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency.service';
import { UsersService } from 'src/app/services/users.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.scss']
})
export class EdititemComponent implements OnInit {
  
  id: number | undefined;
  theItemWarehouse: any =[];
  edit = false;
  
  currentIndex = -1;
  
  changesItem: any = {
    serial:'',
    activation:'',
    warehouserId:5,
    used:0,
    location:'',
    locationId:'',
    status:'',
    statusDescription:'',
    warranty_invoiceDate:'',
    warranty_period:12,
    fechaPrueba: new Date()
  };

  serialcheck ='';

  trackingData:any =[];

  locationSelect:any = [
    {value: 'AGENCY', viewValue:'Agency'},
    {value: 'WAREHOUSE', viewValue:'Warehouse'},
    {value: 'TRANSPORT', viewValue:'Transport'},
  ]

  modification='Made Modifications on item.';
  trackingDataChanges: any ={
    warehouse:'',
    location:'',
    locationId:'',
    status:'',
    statusDetails:'',
  };
  invoiceDate=new Date();
  trackingInfo: any ={
    itemId:'',
    userId:String(localStorage.getItem('id')),
    changes:'',
    type:'Edit Item',
    descriptionTrack:'',
    rawData: String(JSON.stringify(this.changesItem))
    // userTraza:''
  }

  userTrackingData:any =[];

  nombre: any;
  surname: any;
  useridfortrack: any;

  constructor(
    private service: WarehouseService,
    private userService: UsersService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private agencyService: AgencyService
  ) {
    if(localStorage.getItem('nombre')) {
      this.nombre = localStorage.getItem('nombre'); 
    }
    if(localStorage.getItem('surname')) {
      this.surname = localStorage.getItem('surname'); 
    }
    if(localStorage.getItem('id')) {
      this.useridfortrack = localStorage.getItem('id');
    }
   }

  ngOnInit(): void {
    this.id = +this.getWarehouseItemIso(this.route.snapshot.paramMap.get('id'));
    this.getusertrackingdata();
    this.getCategoryList();
    this.getWarehouses();
    this.getUserNamebyId();
    this.getAgencyList();
  }

  editFields(){
    this.edit = !this.edit;
  }

  getWarehouseItemIso(id:any):any{
    this.service.getItemIso(id).subscribe(
      (data)=>{
        this.theItemWarehouse = data[0];
        this.changesItem.name = data[0].name;
        this.changesItem.categoryId = data[0].categoryId;
        this.changesItem.serial = data[0].serial;
        this.changesItem.activation = data[0].activation;
        this.changesItem.warehouseId = data[0].warehouseId;
        this.changesItem.used = data[0].used;
        this.changesItem.location = data[0].location;
        this.changesItem.locationId = data[0].locationId;
        this.changesItem.status = data[0].status;
        this.changesItem.statusDescription = data[0].statusDescription;
        this.changesItem.warranty_invoiceDate = data[0].warranty_invoiceDate;
        this.changesItem.warranty_period = data[0].warranty_period;
        this.trackingInfo.itemId = data[0].serial;
        this.trackingDataChanges.warehouse = data[0].warehouseId;
        this.trackingDataChanges.location = data[0].location;
        this.trackingDataChanges.locationId = data[0].locationId;
        this.trackingDataChanges.status= data[0].status;
        this.trackingDataChanges.statusDescription= data[0].statusDescription;
        this.erase.isDelete = data[0].isDelete;
        let datePrueba = new Date(data[0].warranty_invoiceDate);
        let fechastring = (datePrueba.getMonth()+1)+'/'+datePrueba.getDate()+'/'+datePrueba.getFullYear();
        this.changesItem.fechaPrueba = new Date(fechastring);
        this.getTrackingData(this.trackingInfo.itemId);
      },
      error => {console.log(error);
      });

  }

  updateChanges(id:any){
    // this.setDefaultDate();
    this.changesItem.warranty_invoiceDate = 
    (
      (this.changesItem.fechaPrueba.getFullYear())+'-'+
      (this.changesItem.fechaPrueba.getMonth()+1)+'-'+
      (this.changesItem.fechaPrueba.getDate())
      +' '+'0'+(this.changesItem.fechaPrueba.getHours())+':'
      +'0'+(this.changesItem.fechaPrueba.getMinutes())+':'
      +'0'+(this.changesItem.fechaPrueba.getSeconds())
    );
    this.service.updateWarehouseItem(id, this.changesItem).subscribe(
      (data)=>{
        this.theItemWarehouse.name = this.changesItem.name;
        this.theItemWarehouse.categoryId = this.changesItem.categoryId;
        this.theItemWarehouse.serial = this.changesItem.serial;
        this.theItemWarehouse.activation = this.changesItem.activation;
        this.theItemWarehouse.warehouseId = this.changesItem.warehouseId;
        this.theItemWarehouse.used = this.changesItem.used;
        this.theItemWarehouse.location = this.changesItem.location;
        this.theItemWarehouse.locationId = this.changesItem.locationId;
        this.theItemWarehouse.status = this.changesItem.status;
        this.theItemWarehouse.statusDescription = this.changesItem.statusDescription;
        this.theItemWarehouse.warranty_period = this.changesItem.warranty_period;
        this.changesItem = data;
        console.warn('datos guardados: ',this.changesItem);
        this._snackBar.open("Item Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
      // this.refreshPage();
  }

  erase:any= {   
  };
  deleteItem(id:any){
    this.service.deleteWarehouseItem(id, this.erase).subscribe(
      (data)=>{
        this.theItemWarehouse.isDelete = 1;
        this.theItemWarehouse.isDelete = this.erase.name;
        this.erase = data;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });

  }

  setDefaultDate(){
    let year, month, day, hour, minute, second;

    year = this.invoiceDate.getFullYear();
    month = this.invoiceDate.getMonth()+1;
    day = this.invoiceDate.getDate()+1;
    hour = this.invoiceDate.getHours();
    minute = this.invoiceDate.getMinutes();
    second = this.invoiceDate.getSeconds();

    this.changesItem.warranty_invoiceDate = year+'-'+month+'-'+day+' '+'0'+hour+':'+'0'+minute+':'+'0'+second;
  }
  
  saveItemTrack() {
    let resultadoAg:any;
    let warehouseName:any = this.warehouses.find( (identificadorw:any) => identificadorw.id == this.trackingDataChanges.warehouse );
    if (this.trackingDataChanges.location == 'AGENCY'){
      resultadoAg = this.AgencyList.find( (identificador:any) => identificador.id == this.trackingDataChanges.locationId );
    } else if (this.trackingDataChanges.location == 'WAREHOUSE'){
      resultadoAg = this.warehouses.find( (identificador:any) => identificador.id == this.trackingDataChanges.locationId );
    }

    this.trackingDataChanges.warehouse = this.changesItem.warehouseId;
    this.trackingDataChanges.location = this.changesItem.location;
    this.trackingDataChanges.locationId = this.changesItem.locationId;
    this.trackingDataChanges.status = this.changesItem.status;
    this.trackingDataChanges.statusDetails= this.changesItem.statusDescription;
    console.log("tracking a grabar: ",this.trackingDataChanges);
    this.trackingInfo.changes = 'WarehouseId: '+String(this.trackingDataChanges.warehouse)+" "+warehouseName.name+
    '- Location: '+String(this.trackingDataChanges.location)+
    '- LocationId: '+String(this.trackingDataChanges.locationId)+" "+resultadoAg.name+
    '- Status: '+String(this.trackingDataChanges.status);
    this.trackingInfo.descriptionTrack = this.modification;

    console.log("trancking info Final: ", this.trackingInfo);

    this.service.trackingItem(this.trackingInfo).subscribe(
      (data) => {
        this.theItemWarehouse.serial = this.trackingInfo.itemId;
        console.log(data + "Data a grabar Tracking Info: ", this.trackingInfo + data);
      },
      error => {
        console.log(error)
      }
    );
  }

  warehouses:any=[];
  getWarehouses(){
    this.service.getWarehouseList().subscribe(
      data => {this.warehouses = data}
    );
  }

  categoryList:any =[];
  getCategoryList(){
    this.service.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  }

  UserList:any = [];
  getUserNamebyId(){
    this.userService.getContactList().subscribe(
      data => {this.UserList = data;}
    );
  }

  AgencyList: any = [];
  getAgencyList(){
    this.agencyService.getAgencyList().subscribe(
      data => {this.AgencyList = data;}
    )
  }

  UserCompleteList:any=[];
  getUserCompleteinfo(){
    this.userService.getContactList().subscribe(
      (data)=> {
        this.UserCompleteList = data;
      }
    );
  }
  
  getTrackingData(serial:any){
    this.service.getTrackingData(serial).subscribe(
      (data) => { this.trackingData = data;
      });
  }
  

  getusertrackingdata(){
     this.userService.getUserNameEmailList().subscribe(
      data=> {this.userTrackingData = data;}
    );
  }

  refreshPage(){
    setTimeout(
      function(){window.location.reload()}, 800);
  }
}

