import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Service } from '../../../model/service';
import { Motorized } from '../../../model/Motorized';
import { Property } from '../../../model/Property';
import { SellService } from '../../../service/sell.service';
import { Jsonp } from '@angular/http';
import { Province } from '../../../model/province';
import { Security } from '../../../model/security';
import { Confort } from '../../../model/confort';
import { Sound } from '../../../model/sound';
import { Exterior } from '../../../model/exterior';
import { Equipment } from '../../../model/equipment';
import { Amenities } from '../../../model/amenities';
import { Ambient } from '../../../model/ambient';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit {
  @Input('itemId') localItemId:number;
  @Input('Item') Item:Item =new Item();
  @Input('typeCat') typeCat:string;
  @Input('product') product:Product =new Product();
  title:string="";
  description:string="";
  video:string="";
  msg:string="";
  data:object;
  itemImage:string="";
  itemYear:number;
  kilometer:number;
  quantity:number;
  ambientes:number;
  duildedArea:number;
  datosProductCondition;
  datosProductSaleConditions;
  datosProductFormDelivery;
  datosProductPaymentMethod;
  datosProductPagoEnvio;
  datosProductWarranty;
  //product:Product=new Product();

productCondition:string="";
productSaleConditions:string="";
productQuantity:string="";
productFormDelivery:string="";
productFormDeliveryP:string="";
productPaymentMethod:string="";
productWarranty:string="";
productPagoEnvio:string="";
productPeso:string="";
productVolumen:string="";
popupGarantia:boolean=true;
nuevoB:boolean=false;
usadoB:boolean=false;
popupDescuento:boolean=true;
popupEnvios:boolean=true;
//typeCat:string="Product";
priceDiscount:number;
priceNormal:number;
checkedDiscount:boolean=false;
price:number;
public itemId: number;
productTemp:Product=new Product();
propertyTemp:Property=new Property();
motorizedTemp:Motorized=new Motorized();
serviceTemp:Service=new Service();
hiddenEditProd:boolean=true;
hiddenEditProp:boolean=true;
hiddenEditMoto:boolean=true;
hiddenEditServ:boolean=true;
itemTemp:Item=new Item();
itemType:string;
Service:Service= new Service();
  Product:Product= new Product();
  Motorized:Motorized= new Motorized();
  Property:Property= new Property();
  provinceList: Object[];
  public cobertureZone:Object[]=[];
  public motSecurity:Object[]=[];
  public motConfort:Object[]=[];
  public motSound:Object[]=[];
  public motExterior:Object[]=[];
  public motEquipment:Object[]=[];
  

  public propAmenities:Object[]=[];
  public propAmbient:Object[]=[];
  
  securityList: Object[];
  confortList:Object[];
  soundList:Object[];
  exteriorList:Object[];
  equipmentList:Object[];

  amenitiesList:Object[];
  ambientList:Object[];
  //property
  propertyTotalArea:string;
  propertyDuildedArea:string;
  propertyYear:string;
  //motorized
  motorizedBrand:string;
  motorizedYear:string;
  motorizedModel:string;
  motorizedUnicoDue:string;

  precioEnvio:number;
  disabledRPerson:boolean=false;
  editMoreDiable:boolean=false;
  popup_g:boolean=true;
  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService,private sellService: SellService) { this.Item.name
    this.itemId =route.snapshot.params['itemId'];
    console.log("this.itemId edit:"+this.itemId);
  }

  ngOnInit() {
    this.itemDetailService.getItemById(this.itemId).subscribe(
      res=>{
        this.Item=JSON.parse(JSON.parse(JSON.stringify(res))._body);
        this.Item.user.authorities=null;
        console.log("this.Item:"+JSON.stringify(this.Item))
        this.itemsSet();
      },
      error=>console.error()      
    );
    this.editMoreDiable=false;
    this.hiddenEditProd=true;
    this.hiddenEditProp=true;
    this.hiddenEditMoto=true;
    this.hiddenEditServ=true;
    this.cobertureZone
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  capturarCondicion(con : string){
    this.productCondition=con;
   }
   popSinGarantia(event) {console.log("event.target.checked"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=true;this.productWarranty="";}
    else this.popupGarantia=false;
  }
  
  capturarCondicionVenta(provinceId : string){
    this.productSaleConditions=provinceId;
  }
  
  mediosDPago(pagos:string){
    this.productPaymentMethod=pagos;
    //Precio fijo
    if(pagos=="1")
    this.productPagoEnvio="Precio fijo";
    if(pagos=="2")
    this.productPagoEnvio="Subasta";
  }
  pagoEnvio(envi:string){
    if(envi=="1")
    this.productPagoEnvio="Pagado por él comprador";
    if(envi=="2")
    this.productPagoEnvio="Pagado por él vendedor";
  }
  
  
  pagoMedios(envi:string){
    if(envi=="1")
    this.productPagoEnvio="Aceptar pagos solo por Yingul";
    if(envi=="2")
    this.productPagoEnvio="Aceptar pagos por Yingul y cobro en persona";
  
  }
  
  envioComprador(event){
    
    if(event.target.checked==true) this.productPagoEnvio="comprador";
  }
  envioGratis(event){
    
    if(event.target.checked==true) this.productPagoEnvio="gratis";
  }
  popGarantia(event) {
    if(event.target.checked==true){this.popupGarantia=false;}
    else this.popupGarantia=true;
  
  }
  discountPrice(event){
    if(event.target.checked==true){
      this.popupDescuento=false;
      this.priceNormal=this.Item.priceNormal;
      this.priceDiscount=this.Item.priceDiscount;
    }
  }
  test(event) {   
    if(event.target.checked==true){
      this.productFormDelivery="YingulEnvios"      
      this.popupEnvios=false;
    }
    else {
      this.popupEnvios=true;
    }
  }

  test2(event) {   
    if(event.target.checked==true){
      this.productFormDelivery="YingulEnviosPersona";
    }
  }
  aceptarDiscount(){
    var a=this.priceNormal-this.priceDiscount;
    if(a>0){
    this.popupDescuento=true;
    this.checkedDiscount=false;
    //this.yng_Item.priceDiscount=this.priceDiscount;
    //this.productTemp.yng_Item.priceNormal=this.priceNormal;
    this.price=this.priceDiscount;
    }
    else{
      alert("Los valores no son válidos");
    }
  }
  saveEdit(){
    console.log("this.typeCat:"+this.typeCat);
    console.log("this.itemType"+this.itemType)
    this.itemTemp=this.Item;      
    if(this.title!=""){this.itemTemp.name=this.title;}
    else this.title=this.Item.name;
    if(this.description!=""){this.itemTemp.description=this.description;}
    else this.description=this.Item.description;
    if(this.video!=""){this.itemTemp.video=this.video;}
    else this.video=this.Item.video;
    if(this.price!=undefined){this.itemTemp.price=this.price;}
    else this.price=this.Item.price; 
    if(this.priceNormal!=undefined){this.itemTemp.priceNormal=this.priceNormal;}
    else this.priceNormal=this.Item.priceNormal;  
    if(this.priceDiscount!=undefined){this.itemTemp.priceDiscount=this.priceDiscount;}
    else this.priceDiscount=this.Item.priceDiscount;

    if(this.typeCat=="Product"){
    this.productTemp=this.product;
    this.productTemp.yng_Item=this.itemTemp; 
    this.sendUpdateProduct(this.productTemp);
    }
    else{if(this.itemType=="Vehiculo"){
      this.motorizedTemp=this.Motorized;
      this.motorizedTemp.motorizedConfort=this.motConfort;
      this.motorizedTemp.motorizedEquipment=this.motEquipment;
      this.motorizedTemp.motorizedExterior=this.motExterior;
      this.motorizedTemp.motorizedSecurity=this.motSecurity;
      this.motorizedTemp.motorizedSound=this.motSound;
      this.motorizedTemp.yng_Item=this.itemTemp;
      this.sendUpdateMotorized(this.Motorized);
    }
   else {if(this.itemType=="Inmueble"){
      this.propertyTemp=this.Property;
      this.propertyTemp.propertyAmbient=this.propAmbient;
      this.propertyTemp.propertyAmenities=this.propAmenities;
      this.propertyTemp.yng_Item=this.itemTemp;
      this.sendUpdateProperty(this.propertyTemp)
    }
  else{if(this.itemType=="Servicio"){
    this.serviceTemp=this.Service;
    this.serviceTemp.cobertureZone=this.cobertureZone;
    console.log("cobertureZone: "+JSON.stringify(this.cobertureZone));
    this.serviceTemp.yng_Item=this.itemTemp;
    this.sendUpdateService(this.serviceTemp);

  }
  }
       }

    }    
  }

  cargar(){
    this.productQuantityEdit();
    this.editMoreDiable=true;
  }
  productQuantityEdit():string{
    console.log("this.itemType285:"+this.itemType);
    if(this.itemType=="Producto"){
      this.hiddenEditProd=false;
      if(this.product.productWarranty!=null&&this.product.productWarranty!="") {this.popupGarantia=false;}      
      this.productCondition=this.product.productCondition;
      this.productSaleConditions=this.product.productSaleConditions;
      this.productQuantity=this.Item.quantity.toString();
      this.productFormDelivery=this.product.productFormDelivery;
      this.productPaymentMethod=this.product.productPaymentMethod;
      this.productWarranty=this.product.productWarranty;
      this.productPagoEnvio=this.product.productPagoEnvio;
      this.productPeso=this.product.productPeso;
      this.productVolumen=this.product.producVolumen;
    }
    if(this.itemType=="Inmueble"){
      this.hiddenEditProp=false;
     // this.propAmbient=this.Property.propertyAmbient;
     // this.propAmenities=this.Property.propertyAmenities;
      this.propertyTotalArea=this.Property.propertyTotalArea;
      //this.propertyDuildedArea=this.Property.propertyDuildedArea;
      this.propertyYear=this.Property.propertyYear;
    }
    if(this.itemType=="Vehiculo"){
      this.hiddenEditMoto=false;
     // this.motConfort=this.motorizedTemp.motorizedConfort;
     // this.motEquipment=this.motorizedTemp.motorizedEquipment;
     // this.motExterior=this.motorizedTemp.motorizedExterior;
     // this.motSecurity=this.motorizedTemp.motorizedSecurity;
     // this.motSound=this.motorizedTemp.motorizedSound;
      this.motorizedBrand=this.Motorized.motorizedBrand;
      //this.motorizedYear=this.Motorized.motorizedYear;
      this.motorizedModel=this.Motorized.motorizedModel;
      this.motorizedUnicoDue=this.Motorized.motorizedUnicoDue;
      
      //this.Motorized.motorizedEquipment=this.motEquipment;
    }
    if(this.itemType=="Servicio"){
      this.hiddenEditServ=false;
    }
    console.log("this.itemType:"+this.itemType)
    
    return this.productQuantity;
  }
  productLlenar(){
   // this.hiddenEditProd=false; 
    if(this.product.productWarranty!=null&&this.product.productWarranty!="") {this.popupGarantia=false;}      
    this.productCondition=this.product.productCondition;
    this.productSaleConditions=this.product.productSaleConditions;
    this.productQuantity=this.Item.quantity.toString();
    this.productFormDelivery=this.product.productFormDelivery;
    this.productPaymentMethod=this.product.productPaymentMethod;
    this.productWarranty=this.product.productWarranty;
    this.productPagoEnvio=this.product.productPagoEnvio;
    this.productPeso=this.product.productPeso;
    this.productVolumen=this.product.producVolumen;
  }
  nuevoBbo():boolean{
    if(this.product.productCondition=="Nuevo") return true;
    else return false;
  }
  usadoBbo():boolean{
    if(this.product.productCondition=="Usado") return true;
    else return false;
  }
  garantiaB():boolean{
    if(this.product.productWarranty!=null&&this.product.productWarranty!="") {return true;}    
    else return false;
  }
  sinGarantiaB():boolean{
    if(this.product.productWarranty==null&&this.product.productWarranty!="") { return true;}
    else return false;
  }
  formDeliveryB():boolean{
    if(this.product.productFormDelivery=="YingulEnvios"){this.popupEnvios=false;return true}
    else return false;
  }
  formDeliveryP():boolean{
    if(this.product.productFormDelivery=="YingulEnviosPersona"){return true}
    else return false;
  }
  envioCompradorB():boolean{
    if(this.product.productPagoEnvio=="comprador"){return true}
    else return false;
  }
  envioGratisB():boolean{
    if(this.product.productPagoEnvio=="gratis"){return true}
    else return false;
  }
  sendUpdateProduct(productT:Product){
     if (this.hiddenEditProd==false){
    productT.productCondition=this.productCondition;
    productT.productFormDelivery=this.productFormDelivery;
    productT.productPagoEnvio=this.productPagoEnvio;
    productT.productPaymentMethod=this.productPaymentMethod;
    productT.productPeso=this.productPeso;
    productT.yng_Item.quantity=+this.productQuantity;
    productT.productSaleConditions=this.productSaleConditions;
    productT.productWarranty=this.productWarranty;
    productT.producVolumen=this.productVolumen;
    productT.yng_Item.description=this.description;
    productT.yng_Item.name=this.title;
    productT.yng_Item.price=this.price;
    productT.yng_Item.priceDiscount=this.priceDiscount;
    productT.yng_Item.priceNormal=this.priceNormal;
    productT.yng_Item.video=this.video;
    
  }
     this.product=productT;
     this.product.yng_Item.user.authorities=null;
     console.log("prodssd1: "+JSON.stringify(productT));
     this.popup_g=false;
     this.itemDetailService.postUpdateProduct(this.product).subscribe(
       res => {
         console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
         let resp=JSON.parse(JSON.stringify(res))._body;
          if(resp=="save"){
            this.ngOnInit();
            this.popup_g=true;
          }
          else
          {}
           },
           error => console.log(error)
     );
  }
  sendUpdateMotorized(motorized:Motorized){
    if (this.hiddenEditMoto==false){
      motorized.motorizedBrand=this.motorizedBrand;
      motorized.motorizedModel=this.motorizedModel;
      motorized.motorizedUnicoDue=this.motorizedUnicoDue;
      //motorized.motorizedYear=this.motorizedYear;
      
      this.motorizedTemp.motorizedConfort=this.motConfort;
      this.motorizedTemp.motorizedEquipment=this.motEquipment;
      this.motorizedTemp.motorizedExterior=this.motExterior;
      this.motorizedTemp.motorizedSecurity=this.motSecurity;
      this.motorizedTemp.motorizedSound=this.motSound;
      motorized.yng_Item.description=this.description;
      motorized.yng_Item.name=this.title;
      motorized.yng_Item.price=this.price;
      motorized.yng_Item.priceDiscount=this.priceDiscount;
      motorized.yng_Item.priceNormal=this.priceNormal;
      motorized.yng_Item.video=this.video;
      motorized.yng_Item.itemYear=this.itemYear;
      motorized.yng_Item.kilometer=this.kilometer;
      motorized.yng_Item.quantity=this.quantity;
    }
    this.Motorized=motorized;
    this.Motorized.yng_Item.user.authorities=null;
    //console.log("this.Motorized: "+JSON.stringify( this.Motorized));
    console.log("motorized: "+JSON.stringify( motorized));
    this.popup_g=false;
    this.itemDetailService.postUpdateMotorized(motorized).subscribe(
      res => {
        console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
        let resp=JSON.parse(JSON.stringify(res))._body;
          if(resp=="save"){
            //this.ngOnInit();
            this.popup_g=true;
          }
          },
          error => console.log(error)
    );
 }

 sendUpdateProperty(property:Property){
  if (this.hiddenEditProp==false){
    //property.propertyDuildedArea=this.propertyDuildedArea;
    property.propertyTotalArea=this.propertyTotalArea;
    property.propertyYear=this.propertyYear;
    property.yng_Item.description=this.description;
    property.yng_Item.name=this.title;
    property.yng_Item.price=this.price;
    property.yng_Item.priceDiscount=this.priceDiscount;
    property.yng_Item.priceNormal=this.priceNormal;
    property.yng_Item.video=this.video;
    property.yng_Item.ambientes=this.ambientes;
    property.yng_Item.duildedArea=this.duildedArea;
  }
  this.Property=property;
  this.Property.yng_Item.user.authorities=null;
  console.log("property: "+JSON.stringify(property));
  this.popup_g=false;
  this.itemDetailService.postUpdateProperty(property).subscribe(
    res => {
      console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
      let resp=JSON.parse(JSON.stringify(res))._body;
          if(resp=="save"){
           // this.ngOnInit();
            this.popup_g=true;
          }
        },
        error => console.log(error)
  );
}
sendUpdateService(service:Service){
  console.log("prodssd update: ");
  if (this.hiddenEditServ==false){
  service.cobertureZone=this.cobertureZone;
  //service.emailService
  service.yng_Item.description=this.description;
  service.yng_Item.name=this.title;
  service.yng_Item.price=this.price;
  service.yng_Item.priceDiscount=this.priceDiscount;
  service.yng_Item.priceNormal=this.priceNormal;
  service.yng_Item.video=this.video;  
  }
  this.Service=service;
  this.Service.yng_Item.user.authorities=null;
  this.popup_g=false;
  this.itemDetailService.postUpdateService(this.Service).subscribe(
    res => {
      console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
      let resp=JSON.parse(JSON.stringify(res))._body;
          if(resp=="save"){
            //this.ngOnInit();
            this.popup_g=true;
          }
        },
        error => console.log(error)
  );
}
  getItem(itemType:string, itemId: number){
    this.itemDetailService.getItem(itemType,itemId).subscribe(
			res => {
            switch (itemType) {
              case "Servicio":
                this.Service = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani S: "+ JSON.stringify(this.Service));
                this.cobertureZone=this.Service.cobertureZone;
                this.itemType="Servicio";
                this.editMoreDiable=false;
                break;
              case "Producto":
              console.log(JSON.parse(JSON.parse(JSON.stringify(res))._body));
                this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani Product: "+ JSON.stringify(this.Product));
                this.editMoreDiable=false;
                break;
              case "Inmueble":
                this.Property = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani P: "+ JSON.stringify(this.Property));
                this.propAmbient=this.Property.propertyAmbient;
                this.propAmenities=this.Property.propertyAmenities;
                this.editMoreDiable=false;
                this.itemType="Inmueble";
                break;
              case "Vehiculo":
                this.Motorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani v: "+ JSON.stringify( this.Motorized));
                this.motSecurity=this.Motorized.motorizedSecurity;
                this.motConfort=this.Motorized.motorizedConfort;
                this.motSound=this.Motorized.motorizedSound;
                this.motExterior=this.Motorized.motorizedExterior;
                this.motEquipment=this.Motorized.motorizedEquipment;
                this.editMoreDiable=false;
                this.itemType="Vehiculo";
                break;
              default:
                alert("error");
            }
      		},
      		error => console.log(error)
    )
  }
  zonaServ():boolean{
    if(this.itemType=="Servicio")      return true;
    else                                return false;
  }
  cityB:boolean=false;
      
  check(province:Province){   
    if(this.cobertureZone.length==0){
      this.cobertureZone.push({"province":province});
    }else{
      var aux=false;
      for(var i = 0, len = this.cobertureZone.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.cobertureZone[i])).province) == JSON.stringify(province)) {
          this.cobertureZone.splice(i, 1);   
          aux=true;
          break;    
        }
      }
      if(!aux){
        this.cobertureZone.push({"province":province});
      }
    } 
  }
  checkSecurity(security:Security){
    if(this.motSecurity.length==0){
          this.motSecurity.push({"security":security});
    }else{
      var aux=false;
      for(var i = 0, len = this.motSecurity.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.motSecurity[i])).security) == JSON.stringify(security)) {
          this.motSecurity.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.motSecurity.push({"security":security});
      }
    }
  }

  checkConfort(confort:Confort){
    if(this.motConfort.length==0){
          this.motConfort.push({"confort":confort});
    }else{
      var aux=false;
      for(var i = 0, len = this.motConfort.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.motConfort[i])).confort) == JSON.stringify(confort)) {
          this.motConfort.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.motConfort.push({"confort":confort});
      }
    }    
  }

  checkSound(sound:Sound){
    if(this.motSound.length==0){
          this.motSound.push({"sound":sound});
    }else{
      var aux=false;
      for(var i = 0, len = this.motSound.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.motSound[i])).sound) == JSON.stringify(sound)) {
          this.motSound.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.motSound.push({"sound":sound});
      }
    }    
  }
  checkExterior(exterior:Exterior){
    if(this.motExterior.length==0){
          this.motExterior.push({"exterior":exterior});
    }else{
      var aux=false;
      for(var i = 0, len = this.motExterior.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.motExterior[i])).exterior) == JSON.stringify(exterior)) {
          this.motExterior.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.motExterior.push({"exterior":exterior});
      }
    }
  }

  checkEquipment(equipment:Equipment){
    if(this.motEquipment.length==0){
          this.motEquipment.push({"equipment":equipment});
    }else{
      var aux=false;
      for(var i = 0, len = this.motEquipment.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.motEquipment[i])).equipment) == JSON.stringify(equipment)) {
          this.motEquipment.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.motEquipment.push({"equipment":equipment});
      }
    }
  }


  checkAmenities(amenities:Amenities){
    if(this.propAmenities.length==0){
          this.propAmenities.push({"amenities":amenities});
    }else{
      var aux=false;
      for(var i = 0, len = this.propAmenities.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.propAmenities[i])).amenities) == JSON.stringify(amenities)) {
          this.propAmenities.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.propAmenities.push({"amenities":amenities});
      }
    }
  }
  checkAmbient(ambient:Ambient){
    if(this.propAmbient.length==0){
          this.propAmbient.push({"ambient":ambient});
    }else{
      var aux=false;
      for(var i = 0, len = this.propAmbient.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.propAmbient[i])).ambient) == JSON.stringify(ambient)) {
          this.propAmbient.splice(i, 1);   
          aux=true;
          break;    
      }
        }  
      if(!aux){
        this.propAmbient.push({"ambient":ambient});
      }
    }
    

  }
  
  itemsSet(){
    console.log("itemsSet Item: "+JSON.stringify(this.Item));
    //this.productQuantity=this.Item.quantity.toString();
    this.itemDetailService.getItemType(this.itemId).subscribe(
            res => {
                    this.itemType = JSON.parse(JSON.stringify(res))._body; 
                    //alert("itemType"+this.itemType);             
                   this.getItem(this.itemType,this.itemId);                  
                },
                error => console.log(error)
          );
          //solo sirve para argentina
          this.sellService.getProvinces(2).subscribe(
            res => {
                  this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getSecurity().subscribe(
            res => {
                  this.securityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getConfort().subscribe(
            res => {
                  this.confortList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getSound().subscribe(
            res => {
                  this.soundList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getExterior().subscribe(
            res => {
                  this.exteriorList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getEquipment().subscribe(
            res => {
                  this.equipmentList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )

          this.sellService.getAmenities().subscribe(
            res => {
                  this.amenitiesList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          )
          this.sellService.getAmbient().subscribe(
            res => {
                  this.ambientList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                },
                error => console.log(error)
          ) 
  }
  keyPressEmail(event: any) {
    const patron = /[a-z0-9@.\-_]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patron.test(inputChar)) {
      event.preventDefault();
    }
  }
  provinceCheck(province:Province):boolean{
    var provinceT:Province;
    if(JSON.stringify(this.Service.cobertureZone)!=undefined){
        for(let p of this.Service.cobertureZone){
          provinceT=JSON.parse(JSON.stringify(p)).province;
          if(province.provinceId==provinceT.provinceId){
            return true;
          }
        }
      }
    return false;
  }
  securityCheck(security:Security):boolean{
    var securityT:Security;
    if(JSON.stringify(this.Motorized.motorizedSecurity)!=undefined){
        for(let p of this.Motorized.motorizedSecurity){
          securityT=JSON.parse(JSON.stringify(p)).security;
          if(security.securityId==securityT.securityId){
            return true;
          }
        }
      }
    return false;
  }
  confortCheck(confort:Confort):boolean{
    var confortT:Confort;
    if(JSON.stringify(this.Motorized.motorizedConfort)!=undefined){
        for(let p of this.Motorized.motorizedConfort){
          confortT=JSON.parse(JSON.stringify(p)).confort;
          if(confort.confortId==confortT.confortId){
            return true;
          }
        }
      }
    return false;
  }
  soundCheck(sound:Sound):boolean{
    var soundT:Sound;
    if(JSON.stringify(this.Motorized.motorizedSound)!=undefined){
        for(let p of this.Motorized.motorizedSound){
          soundT=JSON.parse(JSON.stringify(p)).sound;
          if(sound.soundId==soundT.soundId){
            return true;
          }
        }
      }
    return false;
  }
  exteriorCheck(exterior:Exterior):boolean{
    var exteriorT:Exterior;
    if(JSON.stringify(this.Motorized.motorizedExterior)!=undefined){
        for(let p of this.Motorized.motorizedExterior){
          exteriorT=JSON.parse(JSON.stringify(p)).exterior;
          if(exterior.exteriorId==exteriorT.exteriorId){
            return true;
          }
        }
      }
    return false;
  }
  equipmentCheck(equipment:Equipment):boolean{
    var equipmentT:Equipment;

    if(JSON.stringify(this.Motorized.motorizedEquipment)!=undefined){
        for(let p of this.Motorized.motorizedEquipment){
          equipmentT=JSON.parse(JSON.stringify(p)).equipment;
          if(equipment.equipmentId==equipmentT.equipmentId){
            return true;
          }
        }
      }
    return false;
  }
  cancelarDiscount(){
    this.popupDescuento=true;
    this.priceNormal=0;
    this.priceDiscount=0;
   // this.checkedDiscount=false;
  }
}
