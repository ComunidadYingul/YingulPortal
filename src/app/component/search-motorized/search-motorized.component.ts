import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'

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
  subCategoryList: Category[];
  tensubCategoryList: Category[];
  popup:boolean=true;
  constructor(private route:ActivatedRoute,private itemService: ItemService,private categoryService: ListCategoryService) { 
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
    this.subCategoryList=[];
    if(this.categoryId!=0){
      this.categoryService.getSubCategories(this.categoryId.toString()).subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              if(this.subCategoryList.length>9){this.tensubCategoryList=this.subCategoryList.splice(0,9);}
              else{this.tensubCategoryList=this.subCategoryList;}
              if(JSON.stringify(this.subCategoryList)=="[]"){this.tensubCategoryList=null;}
            },
            error => console.log(error)
      );
    }else{

    }
  }
  popupCategory(){
    this.popup=false;
  }
  popupHide(){
    this.popup=true;
  }
}
