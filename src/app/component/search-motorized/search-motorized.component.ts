import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service'

@Component({
  selector: 'app-search-motorized',
  templateUrl: './search-motorized.component.html',
  styleUrls: ['./search-motorized.component.css']
})
export class SearchMotorizedComponent implements OnInit {
  categoryId:number;
  minPrice:number;
  maxPrice:number;
  minYear:number;
  maxYear:number;
  itemList: Object[]=[];
  constructor(private route:ActivatedRoute,private itemService: ItemService) { 
    this.categoryId =route.snapshot.params['categoryId'];
    this.minPrice = route.snapshot.params['minPrice'];
    this.maxPrice = route.snapshot.params['maxPrice'];
    this.minYear = route.snapshot.params['minYear'];
    this.maxYear = route.snapshot.params['maxYear'];
    this.getItems();
  }
  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.itemService.searchMotorized(this.categoryId, this.minPrice, this.maxPrice, this.minYear, this.maxYear).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
}
