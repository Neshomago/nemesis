import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewwarehouse',
  templateUrl: './viewwarehouse.component.html',
  styleUrls: ['./viewwarehouse.component.scss']
})
export class ViewwarehouseComponent implements OnInit {

  id: number | undefined;
  ItemSelected : any;

  
  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
  }

}
