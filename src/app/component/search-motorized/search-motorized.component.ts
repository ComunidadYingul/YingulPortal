import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { FindMotorized } from '../../model/find-motorized';

@Component({
  selector: 'app-search-motorized',
  templateUrl: './search-motorized.component.html',
  styleUrls: ['./search-motorized.component.css']
})
export class SearchMotorizedComponent implements OnInit {
  categoryId:number;
  anios = [];
  aniosTemp =[];
  fechaActual = new Date();
  price =[];
  anio = this.fechaActual.getFullYear();
  minPrice:number;
  maxPrice:number;
  minYear:number;
  maxYear:number;
  itemList: Object[]=[];
  subCategoryList: Category[];
  subCategoryListTemp:Category[];
  tensubCategoryList: Category[];
  popup:boolean=true;
  popup2:boolean=true;
  anioDesde="0";
  anioHasta="0";
  precioDesde;
  precioHasta;
  findMotorized:FindMotorized=new FindMotorized();
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
              this.subCategoryListTemp= JSON.parse(JSON.parse(JSON.stringify(res))._body);
              if(this.subCategoryList.length>5){this.tensubCategoryList=this.subCategoryList.splice(0,5);}
              else{this.tensubCategoryList=this.subCategoryList;}
              if(JSON.stringify(this.subCategoryList)=="[]"){this.tensubCategoryList=null;}
            },
            error => console.log(error)
      );
    }else{
      this.categoryService.getCategories("Motorized/0").subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              this.subCategoryListTemp= JSON.parse(JSON.parse(JSON.stringify(res))._body);
              if(this.subCategoryList.length>5){this.tensubCategoryList=this.subCategoryList.splice(0,5);}
              else{this.tensubCategoryList=this.subCategoryList;}
              if(JSON.stringify(this.subCategoryList)=="[]"){this.tensubCategoryList=null;}
            },
            error => console.log(error)
      );
    }
    this.itemService.getFindMotorized(this.categoryId.toString()).subscribe(
      res => {
            this.findMotorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.setParameters();
          },
          error => console.log(error)
    );
  }
  popupCategory(){
    this.popup=false;
  }
  popupAnio(){
    this.popup2=false;
  }
  popupHide(){
    this.popup=true;
    this.popup2=true;
  }
  setParameters(){
    this.anios=[];
    this.aniosTemp=[];
    //anios
    for(let i = this.anio+1 ;i>=this.findMotorized.minYear;i--){
      this.anios.push(i);
      this.aniosTemp.push(i);
    }
    this.anios=this.anios.splice(0,5);
    this.price=[];
    //precios
    for(let j = this.findMotorized.minPrice ; j<= this.findMotorized.maxPrice ; j=j+this.findMotorized.rankPrice){
      this.price.push(j);
    }
  }
}
