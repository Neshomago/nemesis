import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { RegisteritemComponent } from '../registeritem/registeritem.component';

@Component({
  selector: 'app-viewitemset',
  templateUrl: './viewitemset.component.html',
  styleUrls: ['./viewitemset.component.scss']
})
export class ViewitemsetComponent implements OnInit {

  filteredString: string = '';
  public FilterValue: any;
  filter = false;

  id: number | undefined;
  itemListtotal: any =[];
  currentIndex = -1;
  currentItem: any;
  categoriaId=0;
  constructor(
    private route:ActivatedRoute,
    private wrhsService: WarehouseService,
    private agencyService: AgencyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = +this.getitemIndividualDistrubitionList(this.route.snapshot.paramMap.get('id'));
    this.getWarehouses();
    this.getAgencyList();
    
  }

  getitemIndividualDistrubitionList(id: any): any{
    this.wrhsService.getItemsIndividualList(id).subscribe(
      data => {
        this.itemListtotal = data;
        console.log(this.itemListtotal);
        this.categoriaId = this.itemListtotal[0].categoryId;
      }
    );
  }

  AgencyList: any = [];
  getAgencyList(){
    this.agencyService.getAgencyList().subscribe(
      data => {this.AgencyList = data;}
    );
  }

  warehouses:any = [];
  getWarehouses(){
    this.wrhsService.getWarehouseList().subscribe(
      data => {this.warehouses = data;})
  }

  //Filter searchbox
  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.itemListtotal.filter(
      (item:any) => item.serial.toLowerCase().indexOf(
        this.filteredString.toLowerCase()) !== -1);

        if (resp != null || resp != undefined || resp != "" || resp != []){
          this.filter = true;
          this.filteredResult = resp;
          // return resp;
        }
        if (resp == "" || resp == null || resp == undefined || resp === [] || resp==='' || resp=="clear"){
            this.filteredResult = [];
            this.filter = false;
        }
  }

  //Filter Boxes
  onSelectedFilter(){
    this.filteredResult = this.itemListtotal.filter(
      (ticket:any) => (ticket.used === this.FilterValue || ticket.status == this.FilterValue || ticket.used == this.FilterValue || ticket.location == this.FilterValue));
    this.filter = true;
    if (this.FilterValue == "clear" || this.FilterValue == ''){
      this.filter = false;
      this.filteredResult = [];
    }
  }

  setCurrentIndividualItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }

  abrirModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      categoryId: this.categoriaId
    }
    let dialogRef = this.dialog.open(RegisteritemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      res => {
        console.log("Saliendo de modal");
        this.getWarehouses();
        this.getAgencyList();
        window.location.reload();
      }
    );
  }
}
