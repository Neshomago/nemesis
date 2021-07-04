import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemWarehouse } from 'src/app/tickets';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { AgencyService } from 'src/app/services/agency.service';
import { stringify } from '@angular/compiler/src/util';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from 'src/app/services/ticket.service';

/**Chips for seriales*/
 import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
 import {MatChipInputEvent} from '@angular/material/chips';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

 export interface Serial{
   number: string;
 }

@Component({
  selector: 'app-registeritem',
  templateUrl: './registeritem.component.html',
  styleUrls: ['./registeritem.component.scss']
})
export class RegisteritemComponent implements OnInit {
  
  //Eleemntos de Chips
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  seriales: Serial[] = [];
  //fin elementos chips

  nombre: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;
  iniciales:any;
  surname: any;
  userId: any;

  warehouses:any =[];

  customerId = localStorage.getItem('customerId');
  
  
  itemCtrl: FormControl = new FormControl();
  itemFilterCtrl: FormControl = new FormControl();
  filteredItem:ReplaySubject<listadoItems[]> = new ReplaySubject<listadoItems[]>(1);
  protected _onDestroy = new Subject<void>();
  
  arrayListItems: any[]=[];
  arrayListadoItems: listadoItems[]=[];

  invoiceDate=new Date();
  itemModel: any = {
    name:this.itemCtrl.value,
    description:'',
    serial: '',
    warehouseId: 5,
    location:'WAREHOUSE',
    locationId:5,
    used: 0,
    warrantyPeriod: 12,
    categoryId: 0,
    createdBy: localStorage.getItem('id'),
    // isMoving: 0,
    supplier: '',
    isDelete: 0,
    status:'',
    invoice_purchase: '',
    warranty_invoiceDate:'',
  }

  trackingInfo: any ={
    itemId:'',
    userId:'',
    changes:'',
    type:'Register',
    descriptionTrack:'New item to warehouse',
    rawData: String(JSON.stringify(this.itemModel))
    // userTraza:''
  }

  category:any ={
    category_name:''
  }

 selectedWarehouse = '';

 categoryId=0;

  constructor(private _snackBar:MatSnackBar, private router:Router, private service:WarehouseService,
    private agencyService: AgencyService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data:any
    
    ) { 
    if(localStorage.getItem('zRoleA')) {
      this.zRoleA = localStorage.getItem('zRoleA'); 
    }

    if(localStorage.getItem('zRoleC')) {
      this.zRoleC = localStorage.getItem('zRoleC'); 
    }

    if(localStorage.getItem('zRoleE')) {
      this.zRoleE = localStorage.getItem('zRoleE'); 
    }
    
    if(localStorage.getItem('zRoleT')) {
      this.zRoleT = localStorage.getItem('zRoleT'); 
    }
  
    if(localStorage.getItem('nombre')) {
      this.nombre = localStorage.getItem('nombre'); 
    }
  
    if(localStorage.getItem('surname')) {
      this.surname = localStorage.getItem('surname'); 
    }

    if(localStorage.getItem('id')) {
      this.userId = localStorage.getItem('id'); 
    }
  
  
    this.categoryId = data.categoryId;
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getWarehouses();


    this.getItemList();

    console.log(this.categoryId);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  @ViewChild('serialList') serialList!:any;

  getItemList(){
    this.ticketService.getTagList().subscribe(
      response => {
        this.arrayListItems = response.map((i:any) =>({value:i.description,viewValue:i.name}));
        this.arrayListadoItems = this.arrayListItems;

        this.filteredItem.next(this.arrayListadoItems.slice());
        this.itemFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filterItems();
    });
      });
  }

  filterItems() 
  {
    if (!this.arrayListadoItems) 
    {
      return;
    }
    let search = this.itemFilterCtrl.value;
    if (!search) 
    {
      this.filteredItem.next(this.arrayListadoItems.slice());
      return;
    } 
    else 
    {
      search = search.toLowerCase();
    }
    this.filteredItem.next(
      this.arrayListadoItems.filter(i => i.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }

  
    itemSerial: any =[]
    resultado = 0;
    serialOk(serial:any){
      console.log("SERIALCHECK data enviada: ", serial);
      this.ticketService.getSerialEquipmentCheck(serial).subscribe(
        data => { console.log("SERIALCHECK datos recibidos: ", data);
          this.itemSerial = data[0];
          this.itemSerial.seriales = data[0].seriales;
          this.resultado = data[0].seriales;
          console.log("resultadi: ", this.resultado);
        });
    };

  //metodo para agregar elementos al chips | seriales
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;

    // Add our fruit
    if (value && this.resultado == 1) {
      this.seriales.push({number: value});
    } else {
      this.serialList.errorState = true;
    }
    // Clear the input value
    if(input){
      input.value ='';
    }
  }

  remove(serial: Serial): void {
    const index = this.seriales.indexOf(serial);

    if (index >= 0) {
      this.seriales.splice(index, 1);
    }
  }
  //fin seriales
  
  categoryList:any =[];
  getCategoryList(){
    this.service.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  };

  addCategory(){
    this.service.addCategory(this.category).subscribe(
      data => {this.category = data;
        this.getCategoryList();
      //console.log(this.category + "Was added to category list");
      this.category = [];}
    );
  };

  getWarehouses(){
    this.selectedWarehouse = this.itemModel.warehouseId;
    this.service.getWarehouseList().subscribe(
      data => {this.warehouses = data}
    );
  };

  agencies: any = [];
  getAgencies(){
    this.agencyService.getAgencyList().subscribe(
      (data)=>{
        this.agencies = data
      }
    );
  };
  
    setDefaultDate(){
      let year, month, day, hour, minute, second;
  
      year = this.invoiceDate.getFullYear();
      month = this.invoiceDate.getMonth()+1;
      day = this.invoiceDate.getDate();
      hour = this.invoiceDate.getHours();
      minute = this.invoiceDate.getMinutes();
      second = this.invoiceDate.getSeconds();
  
      this.itemModel.warranty_invoiceDate = year+'-'+month+'-'+day+' '+'0'+hour+':'+'0'+minute+':'+'0'+second;
    };

  addItem(){
    this.setDefaultDate();
    this.seriales.forEach((item:any) => {
      this.itemModel.name = this.itemCtrl.value;
      this.itemModel.serial = item.number;
      this.itemModel.categoryId = this.categoryId;
      //newarray.push({'serial':this.itemModel.serial});
      //console.log(newarray);
      this.service.addItemWarehouse(this.itemModel).subscribe(
        (data) => { this.itemModel = data;
          this._snackBar.open("Item Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
          //this.router.navigateByUrl("/warehouse"); 
          this.dialog.closeAll();
        },
          (error) => { 
            console.log('Datos no guardados', this.itemModel);
            console.log('Failed to Register Item', error);
            this._snackBar.open("Failed to Register Item", "OK", { duration:3500, panelClass: "error",}); },
      )
    });

    console.log(this.itemCtrl.value);
  }

  saveItemTrack() {
    this.trackingInfo.userId = String(localStorage.getItem('id'));
    this.trackingInfo.itemId = this.itemModel.serial;
    this.service.trackingItem(this.trackingInfo).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error)
      }
    );
    // console.log(this.trackingInfo);
  }

  saveItem(){
    this.addItem();
    this.saveItemTrack();
  }

  cerrarModal(){
    this.dialog.closeAll();
  }

}

interface listadoItems{
  value: string;
  viewValue: string;
}
