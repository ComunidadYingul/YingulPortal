import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service'

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {
  itemList: Object[]=[];
  categoryId:number;
  cityId:number;
  constructor(private route:ActivatedRoute,private itemService: ItemService) { 
    this.categoryId =route.snapshot.params['categoryId'];
    this.cityId =route.snapshot.params['cityId'];
    this.getItems();
  }

  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.itemService.searchProperty(this.categoryId, this.cityId).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
}
