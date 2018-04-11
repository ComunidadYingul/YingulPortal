import { Component, OnInit, Output, Input, ViewChild} from '@angular/core';
import { TypeItemComponent } from '../sell/type-item/type-item.component';
import { ListCategoryComponent } from '../../component/sell/list-category/list-category.component'
import { SellService } from '../../service/sell.service';
import { Service } from '../../model/service';
import { Router } from '@angular/router';
import { Item } from '../../model/item';
import { user } from '../../model/user';
import { Product } from '../../model/product';
import { Property } from '../../model/Property';
import { Motorized } from '../../model/Motorized';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  
  loggedIn: boolean;
  hidType:boolean;
  hidCat:boolean;
  hidDet:boolean;
  hidPri:boolean;
  hidTyp:boolean;
  msg:string;
  aux:string;
  popup:boolean=true;
  popup_g:boolean=true;
  User: user=new user();
  //para pedir las categorias
  public url:string = '';
  //tipo de item
  public type:String;
  public typeEs:String="";
  //listcategory
  public category:object[];
  //detail
  public item:Object;
  public item2:Object;
  public itemc:Object;
  //
  public itemP:Object;
  public propertyObj:Object;
  public motorizedObj:Object;
  //price
  public service:Service = new Service();

  public product:Product= new Product();
  public property:Property =new Property();
  public motorized:Motorized =new Motorized();
  public productTem:Product=new Product();

  constructor(private sellService: SellService, private router: Router) { 
    
  }
  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
    this.hidCat=true;
    this.hidDet=true;
    this.hidPri=true;
    this.hidTyp=true;
    this.hidType=false;
  }
  typeItemSe(ev){
    this.type=ev;
    if(this.type=="Service"){
      this.typeEs="Servicio";
    }
    if(this.type=="Product"){
      this.typeEs="Producto";
    }
    if(this.type=="Motorized"){
      this.typeEs="Vehículo";
    }
    if(this.type=="Property"){
      this.typeEs="Inmueble";
    }
    this.url=ev+"/0";
    if(this.type == ''||this.type == null) {
      this.hidType=false;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=true;
      this.hidCat=false;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    }
  }
  categoryItemSe(ev){
    this.category=ev;
    if(this.category == {} || this.category==null) {
      this.hidType=true;
      this.hidCat=false;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=true;
      this.hidCat=true;
      this.hidDet=false;
      this.hidPri=true;
      this.hidTyp=true;
    }
  }
  detailItemSe(ev){
    this.item=ev;
    if(this.item == null) {
      this.hidType=true;
      this.hidCat=true;
      this.hidDet=false;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=true;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=false;
      this.hidTyp=true;
    }
  }

  detailProductSe(ev){
    if(this.type=="Product"){
      this.itemP=ev;
      this.productTem=JSON.parse(JSON.stringify(this.itemP));
    }
    if(this.type=="Property"){
      this.propertyObj=ev;
    }
    if(this.type=="Motorized"){
      this.motorizedObj=ev;
    }    
  }
    
  priceItemSe(ev){
    this.service=ev;
    //el servicio se debe setear en el ultimo metodo
    if(this.service == {}) {
      this.hidType=true;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=false;
      this.hidTyp=true;
    } else {
      //temporalmente finaliza despues llamara a la utlima venta para publicidad
      this.service.yng_Item.user.username=this.User.username;
      this.service.yng_Item.itemCategory=this.category;
      this.item2=this.service.yng_Item;
      this.itemc=Object.assign(this.item, this.item2);
      this.service.yng_Item=JSON.parse(JSON.stringify(this.itemc));
      console.log(JSON.stringify( this.service));
      
      this.saveService();
    }
  }

  detailProductC(ev){
    
        this.product=ev;
        //el servicio se debe setear en el ultimo metodo
        if(this.product == {}) {
          this.hidType=true;
          this.hidCat=true;
          this.hidDet=true;
          this.hidPri=false;
          this.hidTyp=true;
        } else {
          //temporalmente finaliza despues llamara a la utlima venta para publicidad
          //this.product=ev;
          this.product.yng_Item.user.username=this.User.username;
          this.product.yng_Item.itemCategory=this.category;
          
          this.item2=this.product.yng_Item;
          this.itemc=Object.assign(this.item,this.item2);
          this.product.yng_Item=JSON.parse(JSON.stringify(this.itemc));
          //console.log("daniel detailproduc: "  + JSON.stringify(this.product));
          //console.log("daniel itemp: "+ JSON.stringify(this.itemP));
    
          this.product=Object.assign(this.itemP,this.product);
          console.log("Product Fusionado: "  + JSON.stringify(this.product));
          this.saveProduct();
        
        }
      }
    
      detailMotorizedC(ev){
        
            this.motorized=ev;
            //el servicio se debe setear en el ultimo metodo
            if(this.product == {}) {
              this.hidType=true;
              this.hidCat=true;
              this.hidDet=true;
              this.hidPri=false;
              this.hidTyp=true;
            } else {
              //temporalmente finaliza despues llamara a la utlima venta para publicidad
              //this.product=ev;
              this.motorized.yng_Item.user.username=this.User.username;
              this.motorized.yng_Item.itemCategory=this.category;
              
              this.item2=this.motorized.yng_Item;
              this.itemc=Object.assign(this.item,this.item2);
              this.motorized.yng_Item=JSON.parse(JSON.stringify(this.itemc));
              //console.log("daniel detailproduc: "  + JSON.stringify(this.product));
              //console.log("daniel itemp: "+ JSON.stringify(this.itemP));
        
              this.motorized=Object.assign(this.motorizedObj,this.motorized);
              console.log("Product Fusionado: "  + JSON.stringify(this.motorized));
              this.saveMotorized();
            
            }
          }

          detailPropertyC(ev){
            
                this.property=ev;
                //el servicio se debe setear en el ultimo metodo
                if(this.property == {}) {
                  this.hidType=true;
                  this.hidCat=true;
                  this.hidDet=true;
                  this.hidPri=false;
                  this.hidTyp=true;
                } else {
                  //temporalmente finaliza despues llamara a la utlima venta para publicidad
                  //this.product=ev;
                  this.property.yng_Item.user.username=this.User.username;
                  this.property.yng_Item.itemCategory=this.category;
                  
                  this.item2=this.property.yng_Item;
                  this.itemc=Object.assign(this.item,this.item2);
                  this.property.yng_Item=JSON.parse(JSON.stringify(this.itemc));
                  //console.log("daniel detailproduc: "  + JSON.stringify(this.product));
                  //console.log("daniel itemp: "+ JSON.stringify(this.itemP));
            
                  this.property=Object.assign(this.propertyObj,this.property);
                  console.log("Product Fusionado: "  + JSON.stringify(this.property));
                 this.saveProperty();
                
                }
              }
            

      
  sendPriceCat(ev){
    this.popup_g=false;
    if(this.type=="Service"){
      console.log("Service: "+this.type);
     this.priceItemSe(ev);

    }
    if(this.type=="Product"){
      console.log("Product: "+this.type);
     this.detailProductC(ev);
    }

    if(this.type=="Property"){
      console.log("Property: "+this.type);
     this.detailPropertyC(ev);
    }

    if(this.type=="Motorized"){
      console.log("Motorized: "+this.type);
     this.detailMotorizedC(ev);
    }
  }

  backE(ev){
    if(this.category != {}) {
      this.hidType=true;
      this.hidCat=false;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=false;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    }
  }
  backP(ev){
    if(this.service != {}) {
      this.hidType=true;
      this.hidCat=true;
      this.hidDet=false;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=true;
      this.hidCat=false;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    }
  }
  saveService(){
    this.sellService.saveService(this.service).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }

  saveProduct(){
    //alert(this.product);
    console.log("save produc : "+this.product);
    this.sellService.saveProduct(this.product).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }

  saveProperty(){
    //alert(this.property);
    console.log("save produc : "+this.property);
    this.sellService.saveProperty(this.property).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }

  saveMotorized(){
    console.log("save produc : "+this.motorized);
    this.sellService.saveMotorized(this.motorized).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }

  redirectTo(){
    if(this.msg=='save'){
      alert("item registrado exitosamente revise su bandeja de entrada");
      this.router.navigate(['/']);   
    }
    else{
      alert(this.msg);
    } 
  }
  typeItem(){
    this.ngOnInit();
  }
  categories(){
    if(this.type=="Service"){
      this.typeEs="Servicio";
    }
    if(this.type=="Product"){
      this.typeEs="Producto";
    }
    if(this.type=="Motorized"){
      this.typeEs="Vehículo";
    }
    if(this.type=="Property"){
      this.typeEs="Inmueble";
    }
    if(this.type == ''||this.type == null) {
      this.hidType=false;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      this.hidType=true;
      this.hidCat=false;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    }
  }
  detail(){
    if(this.type=="Service"){
      this.typeEs="Servicio";
    }
    if(this.type=="Product"){
      this.typeEs="Producto";
    }
    if(this.type=="Motorized"){
      this.typeEs="Vehículo";
    }
    if(this.type=="Property"){
      this.typeEs="Inmueble";
    }
    if(this.type == ''||this.type == null) {
      this.hidType=false;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      if(this.category == {} || this.category==null) {
        this.hidType=true;
        this.hidCat=false;
        this.hidDet=true;
        this.hidPri=true;
        this.hidTyp=true;
      } else {
        this.hidType=true;
        this.hidCat=true;
        this.hidDet=false;
        this.hidPri=true;
        this.hidTyp=true;
      }
    }
  }
  price(){
    if(this.type=="Service"){
      this.typeEs="Servicio";
    }
    if(this.type=="Product"){
      this.typeEs="Producto";
    }
    if(this.type=="Motorized"){
      this.typeEs="Vehículo";
    }
    if(this.type=="Property"){
      this.typeEs="Inmueble";
    }
    if(this.type == ''||this.type == null) {
      this.hidType=false;
      this.hidCat=true;
      this.hidDet=true;
      this.hidPri=true;
      this.hidTyp=true;
    } else {
      if(this.category == {} || this.category==null) {
        this.hidType=true;
        this.hidCat=false;
        this.hidDet=true;
        this.hidPri=true;
        this.hidTyp=true;
      } else {
        if(this.item == null) {
          this.hidType=true;
          this.hidCat=true;
          this.hidDet=false;
          this.hidPri=true;
          this.hidTyp=true;
        } else {
          this.hidType=true;
          this.hidCat=true;
          this.hidDet=true;
          this.hidPri=false;
          this.hidTyp=true;
        }
      }
    }
  }
}

