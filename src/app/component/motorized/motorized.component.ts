import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { ItemService } from '../../service/item.service'
import { FindMotorized } from '../../model/find-motorized';
import { Router } from '@angular/router';
@Component({
  selector: 'app-motorized',
  templateUrl: './motorized.component.html',
  styleUrls: ['./motorized.component.css']
})
export class MotorizedComponent implements OnInit {
  fechaActual = new Date();
  anios = [];
  anio = this.fechaActual.getFullYear();
  price =[];
  categoryList:Category[];
  subCategoryList: Category[];
  subSubCategoryList: Category[];
  itemList: Object[]=[];
  findMotorized:FindMotorized=new FindMotorized();
  //parametros para armar la url de busqueda
  categoryId: string="0";
  subCategoryId:string="0";
  subSubCategoryId:string="0";
  minPrice:string="0";
  maxPrice:string="0";
  minYear:string="0";
  maxYear:string="0";
  constructor(private categoryService: ListCategoryService,private itemService: ItemService,private router: Router) { }

  ngOnInit() {
    this.getCategories();
    this.itemService.getMotorized().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getCategories() {
    this.categoryService.getCategories("Motorized/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
      		},
      		error => console.log(error)
    )
  }
  getSubCategory(categoryId : string){
    this.categoryId=categoryId;
    this.subCategoryId="0";
    this.subSubCategoryId="0";
    this.subCategoryList=[];
    this.subSubCategoryList=[];
    if(categoryId!="0"){
      this.categoryService.getSubCategories(categoryId).subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body)
            },
            error => console.log(error)
      );
      this.itemService.getFindMotorized(categoryId).subscribe(
        res => {
              this.findMotorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              this.setParameters();
            },
            error => console.log(error)
      );
    }
  }
  getSubSubCategory(categoryId : string){
    this.subCategoryId=categoryId;
    this.subSubCategoryId="0";
    this.subSubCategoryList=[];
    if(categoryId!="0"){
      this.categoryService.getSubCategories(categoryId).subscribe(
        res => {
              this.subSubCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            },
            error => console.log(error)
      );
    }
  }
  setSubSubCategory(categoryId: string){
    this.subSubCategoryId=categoryId;
  }
  setParameters(){
    this.anios=[];
    //anios
    for(let i = this.anio+1 ;i>=this.findMotorized.minYear;i--){
      this.anios.push(i);
    }
    this.price=[];
    //precios
    for(let j = this.findMotorized.minPrice ; j<= this.findMotorized.maxPrice ; j=j+this.findMotorized.rankPrice){
      this.price.push(j);
    }
  }
  setMinPrice(minPrice:string){
    this.minPrice=minPrice;
  }
  setMaxPrice(maxPrice:string){
    this.maxPrice=maxPrice;
  }
  setMinYear(minYear:string){
    this.minYear=minYear;
  }
  setMaxYear(maxYear:string){
    this.maxYear=maxYear;
  }
  search(){
    if(this.subSubCategoryId!="0"){
      let url="/searchMotorized/"+this.subSubCategoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
      this.router.navigate([url]);
    }else{
      if(this.subCategoryId!="0"){
        let url="/searchMotorized/"+this.subCategoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
        this.router.navigate([url]);
      }else{
        let url="/searchMotorized/"+this.categoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
        this.router.navigate([url]);
      }
    }
  }

}
