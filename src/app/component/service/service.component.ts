import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../service/list-category.service'
import { Category } from '../../model/category';
import { ItemService } from '../../service/item.service'
import { Network } from '../../model/Network';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  categoryList: Category[];
  subCategoryList=[];
  itemList: Object[]=[];

  constructor(private categoryService: ListCategoryService,private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getServices().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories("Service/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.getSubCategories();       
      		},
      		error => console.log(error)
    )
  }
  getSubCategories(){
    for(let i=0;i<this.categoryList.length;i++){
      this.categoryService.getSubCategories(JSON.stringify(this.categoryList[i].categoryId)).subscribe(
        res => {
              this.subCategoryList[this.categoryList[i].categoryId] = JSON.parse(JSON.parse(JSON.stringify(res))._body);      
            },
            error => console.log(error)
      );
    }
  }
}
