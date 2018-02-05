import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Object[];
  constructor(private categoryService: ListCategoryService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories("Product/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);       
      		},
      		error => console.log(error)
    )
  }
}
