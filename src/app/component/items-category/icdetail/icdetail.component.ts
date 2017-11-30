import { Component, OnInit, Input } from '@angular/core';
import { ItemsCategoryService } from '../../../service/items-category.service'

@Component({
  selector: 'app-icdetail',
  templateUrl: './icdetail.component.html',
  styleUrls: ['./icdetail.component.css']
})
export class IcdetailComponent implements OnInit {
  @Input('categoryId') categoryId:number;
  itemCategoryList: Object[]=[];
  constructor(private itemsCategoryService: ItemsCategoryService) { }

  ngOnInit() {
    this.getItemsByCategory();
  }
  getItemsByCategory() {
    this.itemsCategoryService.getItemsByCategory(this.categoryId).subscribe(
			res => {
            this.itemCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.itemCategoryList));
      		},
      		error => console.log(error)
    )
  }

}
