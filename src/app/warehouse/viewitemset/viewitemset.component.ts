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
