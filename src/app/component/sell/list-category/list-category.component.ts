import { Component, OnInit, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  htmlContent:string;
  imageList:Object[];
  categoryList: Object[];
  subCategoryList: Object[];
  subsubCategoryList: Object[];
  subsubsubCategoryList: Object[];
  itemCategory1: Object[] =[];
  itemCategory: Object[] = [];
  @Output() categoryItemS = new EventEmitter();
  @Input('url') url:string;

  constructor(private categoryService: ListCategoryService) { 
    //this.getCategories();
  }
  getCategories() {
    if(this.url!=''){
    this.categoryService.getCategories(this.url).subscribe(
			res => {
        		this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )}
  }
  ngOnInit() {
    
  }
  getSubCategory(categoryId : string, category0: Object){
    this.itemCategory = [];
    this.itemCategory1 = [];
    this.itemCategory.push(category0);
    this.itemCategory1.push({"category":category0});
    this.subsubCategoryList=[];
    this.subsubsubCategoryList=[];
    this.categoryService.getSubCategories(categoryId).subscribe(
			res => {
            this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(!this.subCategoryList[0]){
              this.sendCategories();
            }
      		},
      		error => console.log(error)
    )
  }
  getSubSubCategory(category : Object){
    //condicion para que si seleccionas otra categoria nivel 1 se borre la primera
    this.itemCategory.splice(1,this.itemCategory1.length);
    this.itemCategory1.splice(1,this.itemCategory1.length);
    //fin de la condicion
    this.itemCategory.push(category)
    this.itemCategory1.push({"category":category});
    this.subsubsubCategoryList=[];
    this.categoryService.getSubCategories(JSON.stringify(JSON.parse(JSON.parse(JSON.stringify(category)).categoryId))).subscribe(
			res => {
            this.subsubCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(!this.subsubCategoryList[0]){
              this.sendCategories();
            }
      		},
      		error => console.log(error)
    )
  }
  getSubSubSubCategory(category : Object){
    this.itemCategory.splice(2,this.itemCategory1.length);
    this.itemCategory1.splice(2,this.itemCategory1.length);
    this.itemCategory.push(category);
    this.itemCategory1.push({"category":category});
    this.categoryService.getSubCategories(JSON.stringify(JSON.parse(JSON.parse(JSON.stringify(category)).categoryId))).subscribe(
			res => {
            this.subsubsubCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(!this.subsubsubCategoryList[0]){
              this.sendCategories();
            }
      		},
      		error => console.log(error)
    )
    
  }
  getSubSubSubSubCategory(category : Object){
    this.itemCategory.splice(3,this.itemCategory1.length);
    this.itemCategory1.splice(3,this.itemCategory1.length);
    this.itemCategory.push(category);
    this.itemCategory1.push({"category":category});
    this.sendCategories();
  }
  ngOnChanges(changes) {
    this.getCategories();
  }

  sendCategories(){
    this.categoryItemS.emit(this.itemCategory1);
  }
}
