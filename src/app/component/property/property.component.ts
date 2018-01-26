import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { City } from '../../model/city';
import { UbicationService } from '../../service/ubication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  itemList: Object[]=[];
  constructor(private itemService: ItemService,private categoryService: ListCategoryService, private ubicationService: UbicationService,private router: Router) { }
  categoryList:Category[];
  subCategoryList: Category[];
  cities:City[];
  vsubcategory="0";
  //parametros para armar la url
  categoryId: string="0";
  subCategoryId:string="0";
  cityId:string="0";
  ngOnInit() {
    this.getCategories();
    this.itemService.getProperty().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getCategories() {
    this.categoryService.getCategories("Property/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.categoryList=this.categoryList.sort();    
      		},
      		error => console.log(error)
    )
  }
  getSubCategory(categoryId : string){
    this.vsubcategory="0";
    this.categoryId=categoryId;
    this.subCategoryList=[];
    if(categoryId!="0"){
      this.categoryService.getSubCategories(categoryId).subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            },
            error => console.log(error)
      );
    }
  }
  onSearchChange(name) {
		if(name!=""){
      if(name.indexOf(",")>-1){
        name=name.substring(0,name.indexOf(","));
      }
			this.ubicationService.getCitiesByName(name).subscribe(
			res => {
						this.cities = JSON.parse(JSON.parse(JSON.stringify(res))._body);
						this.cities = this.cities.sort();
						for (var i = 0; i < this.cities.length; i++) {
							if (JSON.parse(JSON.stringify(this.cities[i])).name === name) {
                 this.cityId=JSON.parse(JSON.stringify(this.cities[i])).cityId;
                 this.search();
							  break;
							}
					  }	
				},
				error => console.log(error)
			);
		}
  }
  setSubCategory(categoryId : string){
    this.subCategoryId=categoryId;
  }

  search(){
    if(this.subCategoryId!="0"){
      let url="/searchProperty/"+this.subCategoryId+"/"+this.cityId;
      this.router.navigate([url]);
    }else{
      let url="/searchProperty/"+this.categoryId+"/"+this.cityId;
      this.router.navigate([url]);
    }
  }
}
