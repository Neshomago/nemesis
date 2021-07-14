import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import {MatListModule} from '@angular/material/list';
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  selection = new SelectionModel(true);
  category:any ={
    category_name:''
  }
  
  constructor(private service:WarehouseService) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  categoryList:any =[];
  getCategoryList(){
    this.service.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  };

  addCategory(){
    this.service.addCategory(this.category).subscribe(
      data => {this.category = data;
        //console.log(this.category + "Was added to category list");
        this.getCategoryList();
    }
    );
  };

}
