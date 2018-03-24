import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Object[];
  slideConfig={
    //"dots": true,
    "infinite": false,
    "speed": 300,
    "slidesToShow": 6,
    "slidesToScroll": 6,
    //"autoplay": true,
    //"autoplaySpeed": 2000,
    "responsive": [
      {
        "breakpoint": 1900,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 6,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 3,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      }
    ]
  };
  slideConfig1={
    "infinite": false,
    "slidesToShow": 1.5,
  "slidesToScroll": 1};
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
