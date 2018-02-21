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
  @Input('typeCat') typeCat:string="";
  @Input('product') product:Product =new Product();
  title:string="";
  description:string="";
  video:string="";
  msg:string="";
  data:object;
  itemImage:string="";
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
  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService,private sellService: SellService) { this.Item.name
    this.itemId =route.snapshot.params['itemId'];
    console.log("this.itemId edit:"+this.itemId);
  }

  ngOnInit() {
    console.log("Item: "+JSON.stringify(this.Item));
    this.productQuantity=this.product.productQuantity;
    this.itemDetailService.getItemType(this.itemId).subscribe(
            res => {
                    this.itemType = JSON.parse(JSON.stringify(res))._body;              
                   this.getItem(this.itemType,this.itemId);                  
                },
                error => console.log(error)
          );
          this.sellService.getProvinces().subscribe(
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
    this.sendCotizar(this.productTemp);
    }
    else{if(this.typeCat=="Vehiculo"){
      this.motorizedTemp=this.Motorized;
      this.motorizedTemp.motorizedConfort=this.motConfort;
      this.motorizedTemp.motorizedEquipment=this.motEquipment;
      this.motorizedTemp.motorizedExterior=this.motExterior;
      this.motorizedTemp.motorizedSecurity=this.motSecurity;
      this.motorizedTemp.motorizedSound=this.motSound;
      this.motorizedTemp.yng_Item=this.itemTemp;
      this.sendUpdateMotorized(this.Motorized);
    }
   else {if(this.typeCat=="Inmueble"){
      this.propertyTemp=this.Property;
      this.propertyTemp.propertyAmbient=this.propAmbient;
      this.propertyTemp.propertyAmenities=this.propAmenities;
      this.propertyTemp.yng_Item=this.itemTemp;
      this.sendUpdateProperty(this.propertyTemp)
    }
  
       }

    }    
  }

  cargar(){
    this.productQuantityEdit();

  }
  productQuantityEdit():string{
    if(this.itemType=="Producto"){
      this.hiddenEditProd=false;
      if(this.product.productWarranty!=null&&this.product.productWarranty!="") {this.popupGarantia=false;}      
      this.productCondition=this.product.productCondition;
      this.productSaleConditions=this.product.productSaleConditions;
      this.productQuantity=this.product.productQuantity;
      this.productFormDelivery=this.product.productFormDelivery;
      this.productPaymentMethod=this.product.productPaymentMethod;
      this.productWarranty=this.product.productWarranty;
      this.productPagoEnvio=this.product.productPagoEnvio;
      this.productPeso=this.product.productPeso;
      this.productVolumen=this.product.producVolumen;
    }
    if(this.itemType=="Inmueble"){
      this.hiddenEditProp=false;
      this.propAmbient=this.Property.propertyAmbient;
      this.propAmenities=this.Property.propertyAmenities;
      this.propertyTotalArea=this.Property.propertyTotalArea;
      this.propertyDuildedArea=this.Property.propertyDuildedArea;
      this.propertyYear=this.Property.propertyYear;
    }
    if(this.itemType=="Vehiculo"){
      this.hiddenEditMoto=false;
      this.motConfort=this.motorizedTemp.motorizedConfort;
      this.motEquipment=this.motorizedTemp.motorizedEquipment;
      this.motExterior=this.motorizedTemp.motorizedExterior;
      this.motSecurity=this.motorizedTemp.motorizedSecurity;
      this.motSound=this.motorizedTemp.motorizedSound;
      this.motorizedBrand=this.Motorized.motorizedBrand;
      this.motorizedYear=this.Motorized.motorizedYear;
      this.motorizedModel=this.Motorized.motorizedModel;
      this.motorizedUnicoDue=this.Motorized.motorizedUnicoDue;
    }
    if(this.itemType=="Servicio"){this.hiddenEditServ=false;}
    console.log("this.product.productWarranty:"+this.product.productWarranty)
    
    return this.productQuantity;
  }
  productLlenar(){
   // this.hiddenEditProd=false; 
    if(this.product.productWarranty!=null&&this.product.productWarranty!="") {this.popupGarantia=false;}      
    this.productCondition=this.product.productCondition;
    this.productSaleConditions=this.product.productSaleConditions;
    this.productQuantity=this.product.productQuantity;
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
  sendCotizar(productT:Product){
     if (this.hiddenEditProd==false){
    productT.productCondition=this.productCondition;
    productT.productFormDelivery=this.productFormDelivery;
    productT.productPagoEnvio=this.productPagoEnvio;
    productT.productPaymentMethod=this.productPaymentMethod;
    productT.productPeso=this.productPeso;
    productT.productQuantity=this.productQuantity;
    productT.productSaleConditions=this.productSaleConditions;
    productT.productWarranty=this.productWarranty;
    productT.producVolumen=this.productVolumen;
    productT.yng_Item.description=this.description;
    productT.yng_Item.name=this.title;
    productT.yng_Item.price=this.price;
    productT.yng_Item.priceDiscount=this.priceDiscount;
    productT.yng_Item.priceNormal=this.priceNormal;
    productT.yng_Item.video=this.video;}
     this.product=productT;
     console.log("prodssd: "+JSON.stringify(productT));
     this.itemDetailService.postUpdateProduct(this.product).subscribe(
       res => {
         console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
           },
           error => console.log(error)
     );
  }
  sendUpdateMotorized(motorized:Motorized){
    if (this.hiddenEditProd==false){
      motorized.motorizedBrand=this.motorizedBrand;
      motorized.motorizedModel=this.motorizedModel;
      motorized.motorizedUnicoDue=this.motorizedUnicoDue;
      motorized.motorizedYear=this.motorizedYear;
      motorized.yng_Item.description=this.description;
      motorized.yng_Item.name=this.title;
      motorized.yng_Item.price=this.price;
      motorized.yng_Item.priceDiscount=this.priceDiscount;
      motorized.yng_Item.priceNormal=this.priceNormal;
      motorized.yng_Item.video=this.video;}
    this.Motorized=motorized;
    console.log("prodssd: "+JSON.stringify(motorized));
    this.itemDetailService.postUpdateMotorized(this.Motorized).subscribe(
      res => {
        console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
          },
          error => console.log(error)
    );
 }

 sendUpdateProperty(property:Property){
  if (this.hiddenEditProd==false){
    property.propertyDuildedArea=this.propertyDuildedArea;
    property.propertyTotalArea=this.propertyTotalArea;
    property.propertyYear=this.propertyYear;
    property.yng_Item.description=this.description;
    property.yng_Item.name=this.title;
    property.yng_Item.price=this.price;
    property.yng_Item.priceDiscount=this.priceDiscount;
    property.yng_Item.priceNormal=this.priceNormal;
    property.yng_Item.video=this.video;}
  this.Property=property;
  console.log("prodssd: "+JSON.stringify(property));
  this.itemDetailService.postUpdateProperty(this.Property).subscribe(
    res => {
      console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
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
                break;
              case "Producto":
              console.log(JSON.parse(JSON.parse(JSON.stringify(res))._body));
                this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                break;
              case "Inmueble":
                this.Property = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani P: "+ JSON.stringify(res));
                break;
              case "Vehiculo":
                this.Motorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani v: "+ JSON.stringify(res));
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
  checkedZone(provinceName:string):boolean{    
    //console.log("provinceName"+ provinceName+"this.Service.cobertureZone length: "+this.Service.cobertureZone.length);     
        for(let zone of this.Service.cobertureZone){
      
        //console.log("zone:"+(JSON.stringify(zone)));
        if(provinceName==JSON.parse((JSON.stringify(zone))).province.name){
          console.log("zone if :"+provinceName);
          this.cityB= true;
        }
        else this.cityB= false;
      // 
      }    
      console.log("this.cityB:"+this.cityB);
    return this.cityB;
  }
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
    if(security){
      if(this.motSecurity.indexOf({"security":security})==-1){
          this.motSecurity.push({"security":security});
      }
      else{
        const index: number = this.motSecurity.indexOf({"security":security});
        if (index !== -1) {
            this.motSecurity.splice(index, 1);
        }  
      }
    }

  }

  checkConfort(confort:Confort){
    if(confort){
      if(this.motConfort.indexOf({"confort":confort})==-1){
          this.motConfort.push({"confort":confort});
      }
      else{
        const index: number = this.motConfort.indexOf({"confort":confort});
        if (index !== -1) {
            this.motConfort.splice(index, 1);
        }  
      }
    }    
  }

  checkSound(sound:Sound){
    if(sound){
      if(this.motSound.indexOf({"sound":sound})==-1){
          this.motSound.push({"sound":sound});
      }
      else{
        const index: number = this.motSound.indexOf({"sound":sound});
        if (index !== -1) {
            this.motSound.splice(index, 1);
        }  
      }
    }    
  }
  checkExterior(exterior:Exterior){
    if(exterior){
      if(this.motExterior.indexOf({"exterior":exterior})==-1){
          this.motExterior.push({"exterior":exterior});
      }
      else{
        const index: number = this.motExterior.indexOf({"exterior":exterior});
        if (index !== -1) {
            this.motExterior.splice(index, 1);
        }  
      }
    }

  }

  checkEquipment(equipment:Equipment){
    if(equipment){
      if(this.motEquipment.indexOf({"equipment":equipment})==-1){
          this.motEquipment.push({"equipment":equipment});
      }
      else{
        const index: number = this.motEquipment.indexOf({"equipment":equipment});
        if (index !== -1) {
            this.motEquipment.splice(index, 1);
        }  
      }
    }
  }


  checkAmenities(amenities:Amenities){
    if(amenities){
      if(this.propAmenities.indexOf({"amenities":amenities})==-1){
          this.propAmenities.push({"amenities":amenities});
      }
      else{
        const index: number = this.propAmenities.indexOf({"amenities":amenities});
        if (index !== -1) {
            this.propAmenities.splice(index, 1);
        }  
      }
    }
  }
  checkAmbient(ambient:Ambient){
    if(ambient){
      if(this.propAmbient.indexOf({"ambient":ambient})==-1){
          this.propAmbient.push({"ambient":ambient});
      }
      else{
        const index: number = this.propAmbient.indexOf({"ambient":ambient});
        if (index !== -1) {
            this.propAmbient.splice(index, 1);
        }  
      }
    }
    


  }
}
