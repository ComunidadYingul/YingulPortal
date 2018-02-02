import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Store } from '../../../model/store';
import { Category } from '../../../model/category';
import { ListCategoryService } from '../../../service/list-category.service'

@Component({
  selector: 'app-about-business',
  templateUrl: './about-business.component.html',
  styleUrls: ['./about-business.component.css']
})
export class AboutBusinessComponent implements OnInit {
  detailWebsite:boolean = false;
  website:string;
  @Input('Store') store:Store;
  categoryList:Category[];
  @Output() setStore = new EventEmitter();
  constructor(private categoryService: ListCategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories("Product/0").subscribe(
			res => {
        		this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
  }
  check(typebuy:string){
    switch (typebuy) {
      case "yes":
        this.detailWebsite = true;
        break;
      case "no":
        this.detailWebsite = false;
        this.website=null;
        this.store.traficInvest=null;
        break;
      default:

    }
  }
  setEmployesQuantity(employesQuantity:string){
    this.store.employeesQuantity=employesQuantity;
  }
  setEcommerceExperience(ecommerceExperience:string){
    this.store.ecommerceExperience=ecommerceExperience;
  }
  settraficInvest(traficInvest:string){
    this.store.traficInvest=traficInvest;
  }
  sendAboutBusines(){
    this.store.webSite=this.website;
    this.setStore.emit(this.store);
  }
  setCategory(category:string){
    if(category=="Property"||category=="Motorized"||category=="Service"||category=="Product"){
      this.store.itemsType=category;
      this.store.mainCategory=null;
    }else{
      this.store.itemsType="Product";
      this.store.mainCategory.categoryId=Number(category);
    } 
  }
}
