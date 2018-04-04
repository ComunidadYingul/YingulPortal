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
  categoryTemp:Category =new Category();

  /************************* VARIABLES HID ****************************/
  hidStoreCategory:Boolean=true;
  hidStoreQuantity:boolean=true;
  hidStoreExperience:boolean=true;
  hidStoreWebsite:boolean=true;
  hidStoreTraffic:boolean=true;
  /************************* VARIABLES VALIDACION ****************************/
  valCategory:string="null";
  valQuantity:string="null";
  valExperience:string="null";
  valTraffic:string="null";

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
    this.valQuantity=employesQuantity;
  }
  setEcommerceExperience(ecommerceExperience:string){
    this.store.ecommerceExperience=ecommerceExperience;
    this.valExperience=ecommerceExperience;
  }
  settraficInvest(traficInvest:string){
    this.store.traficInvest=traficInvest;
    this.valTraffic=traficInvest;
  }
  sendAboutBusines(){
    if(this.validarStore()){
      this.store.webSite=this.website;
      this.setStore.emit(this.store);
    }
  }

  validarStore(){
    this.resetStore();
    if(this.valCategory=="null"){
      this.hidStoreCategory=false;
      return false;
    }else if(this.valQuantity=="null"){
      this.hidStoreQuantity=false;
      return false;
    }else if(this.valExperience=="null"){
      this.hidStoreExperience=false;
      return false;
    }else if(this.detailWebsite == true && (this.website==null || this.website=="")){
      this.hidStoreWebsite=false;
      return false;
    }else if(this.detailWebsite == true && this.valTraffic=="null"){
      this.hidStoreTraffic=false;
      return false;
    }else{
      return true;
    }
  }

  resetStore(){
    this.hidStoreCategory=true;
    this.hidStoreQuantity=true;
    this.hidStoreExperience=true;
    this.hidStoreWebsite=true;
    this.hidStoreTraffic=true;
  }

  setCategory(category:string){
   //alert(this.valCategory);
    if(category=="Property"||category=="Motorized"||category=="Service"||category=="Product"){
      this.store.itemsType=category;
      this.store.mainCategory=null;
    }else{
      this.store.itemsType="Product";
      this.categoryTemp.categoryId=Number(category);
      this.store.mainCategory=this.categoryTemp;
      //this.store.mainCategory.categoryId=Number(category);
    } 
    this.valCategory=category;
  }
}
