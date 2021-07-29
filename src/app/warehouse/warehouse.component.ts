import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewitemsetComponent } from 'src/app/warehouse/viewitemset/viewitemset.component';
import { AgencyService } from '../services/agency.service';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  filteredString: string = '';
  TheGeneralList:any = [];
  currentIndex = -1;
  currentItem = null;

  public FilterValue: any;
  filter = false;
  showstockedit = false;

  stockUpdate: any ={
    minimumStock:''
  }
  constructor(private whsservice: WarehouseService,
    public dialog:MatDialog,
    private agencyService:AgencyService,
    private wrhsService:WarehouseService) { }

  
  ngOnInit(): void {
    this.getListofItemsinWarehouse();
    this.getCategoryList();
    this.getAgencyList();
    this.getWarehouses();
  }
  
  // Getting general info of Items
  getListofItemsinWarehouse(){
    this.whsservice.getItemsList().subscribe(
      data => { this.TheGeneralList = data;
        console.log(this.TheGeneralList);
    });
  }

  AgencyList: any = [];
  getAgencyList(){
    this.agencyService.getAgencyList().subscribe(
      data => {this.AgencyList = data;
      }
    );
  }

  warehouses:any = [];
  getWarehouses(){
    this.wrhsService.getWarehouseList().subscribe(
      data => {this.warehouses = data;
        console.log("item de bodega: ", this.warehouses[0]);})
  }

  categoryList:any =[];
  getCategoryList(){
    this.whsservice.getCategories().subscribe(
    data => { this.categoryList = data;
      console.log(this.categoryList);
    });
  }
  
  contar(id:any){
    let resp = 0;
	  for ( let i = 0; i < this.TheGeneralList.length; i++) {
  		if(this.TheGeneralList[i].categoryId == id) {
  			resp++;
  		}
	  }
	  return resp;
  }

  setCurrentItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }

  stockEdit(){
    this.showstockedit = !this.showstockedit;
  }


  //Function update value, no funciona aun.
  updateStock(){
    let i= 0;
    this.categoryList.forEach((element:any) => {
      this.whsservice.categoryStock(element.id, element).subscribe(
        (data) => {console.log(data);
        if (this.categoryList.length == (i+1)){
          // this.getCategoryList(element.id);
          this.getCategoryList();
        }
        i++;
    });
  });
  this.stockEdit();
}

  //Filter searchbox
  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.TheGeneralList.filter(
      (item:any) => item.serial.toLowerCase().indexOf(
        this.filteredString.toLowerCase()) !== -1 || item.secondSerial.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);

        if (resp != null || resp != undefined || resp != "" || resp != []){
          this.filter = true;
          this.filteredResult = resp;
          // return resp;
        }
        if (resp == "" || resp == null || resp == undefined || resp === [] || resp===''){
          this.filteredResult = [];
          this.filter = false;
        }
  }

  //Filter Boxes
  onSelectedFilter(){
    this.filteredResult = this.TheGeneralList.filter(
      (ticket:any) => (ticket.used == this.FilterValue 
        || ticket.status == this.FilterValue 
        || ticket.location == this.FilterValue
        || ticket.warehouseId == this.FilterValue));
    
      this.filter = true;
    if (this.FilterValue == "clear" || this.FilterValue==''){
      this.filter = false;
      this.filteredResult = [];
    }
  }

  limpiarFiltro(){
    this.FilterValue = "";
      this.filter = false;
      this.filteredResult = [];
  }

  openDialogCategory(){
    this.dialog.open(CreateCategoryComponent);
  }

  setCurrentIndividualItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }
  // openDialogItemSetBox(id:any){
  //   this.dialog.open(ViewitemsetComponent);
  // }
}
