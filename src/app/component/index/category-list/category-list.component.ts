import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Object[];
  slideConfig3 = {
    //"dots": true,
     "infinite": false,
     "speed": 300,
     "slidesToShow": 9,
     "slidesToScroll": 9,
     //"autoplay": true,
     //"autoplaySpeed": 2000,
     "responsive": [
       {
         "breakpoint": 1981,
         "settings": {
           "slidesToShow": 10,
           "slidesToScroll": 10,
           "infinite": false,
           "dots": true
         }
       },
       {
         "breakpoint": 1367,
         "settings": {
           "slidesToShow": 7.7,
           "slidesToScroll": 7,
           "infinite": false,
           "dots": true
         }
       },
       {
         "breakpoint": 1025,
         "settings": {
           "slidesToShow": 5.7,
           "slidesToScroll": 5,
           "infinite": false,
           "dots": true
         }
       },
       {
         "breakpoint": 601,
         "settings": {
           "slidesToShow": 3,
           "slidesToScroll": 3,
           "infinite": false,
           "dots": true
         }
       },
       {
         "breakpoint": 481,
         "settings": {
           "slidesToShow": 2,
           "slidesToScroll": 2,
           "dots": true
         }
       }
     ]
   };

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
