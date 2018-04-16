import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Object[];
  slideConfig3={
    "typeSlide":"category",
    "anchoSlide":560,
    //"dots": true,
    "infinite": false,
    //"speed": 350,
    //"slidesToShow": 2,
    "slidesToScroll": 3,
    //"autoplay": true,
    //"autoplaySpeed": 2000,
    "responsive": [
      {
        "breakpoint": 320,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 640,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 3,
        }
      },
      {
        "breakpoint": 800,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 960,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 5,
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 1440,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 5,
        }
      },
      {
        "breakpoint": 1680,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 6,
        }
      },
      {
        "breakpoint": 1920,
        "settings": {
          "slidesToShow": 7,
          "slidesToScroll": 7,
        }
      },
      {
        "breakpoint": 2160,
        "settings": {
          "slidesToShow": 8,
          "slidesToScroll": 8,
        }
      },
      {
        "breakpoint": 2400,
        "settings": {
          "slidesToShow": 9,
          "slidesToScroll": 9,
        }
      },
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
