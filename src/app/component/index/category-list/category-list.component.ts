import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Object[];
  categoryList1:Object[];
  categoryList2:Object[];
  categoryList3:Object[];
  categoryList4:Object[];
  constructor(private categoryService: ListCategoryService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories("Product/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.categoryList1=this.categoryList.slice(0,this.categoryList.length/4);
            this.categoryList2=this.categoryList.slice(this.categoryList.length/4,this.categoryList.length/4*2);
            this.categoryList3=this.categoryList.slice(this.categoryList.length/4*2,this.categoryList.length/4*3);
            this.categoryList4=this.categoryList.slice(this.categoryList.length/4*3,this.categoryList.length/4*4);          
      		},
      		error => console.log(error)
    )
  }
}
