import { Injectable, ElementRef, Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { Item } from '../../../model/item';
import { Observer } from 'rxjs';

import { Product } from '../../../model/product';
import { Property } from '../../../model/Property';
import { Motorized } from '../../../model/Motorized';

import { Security } from '../../../model/security';
import { Confort } from '../../../model/confort';
import {  Sound } from '../../../model/sound';
import { Exterior } from '../../../model/exterior';
import { Equipment } from '../../../model/equipment';
import { Amenities } from '../../../model/amenities';
import { Ambient } from '../../../model/ambient';
import { SellService } from '../../../service/sell.service'
import { error } from 'util';
import { Jsonp } from '@angular/http/src/http';
import { user } from '../../../model/user';
import { Ubication } from '../../../model/ubication';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
@Injectable()
export class DetailComponent implements OnInit {

  @Input('category') categoryList: Object[] ;
  @Output() Back = new EventEmitter();
  @Output() detailItemS = new EventEmitter();
  @Output() detailProduct = new EventEmitter();
  @Input()  typeCat:any;

  public typeCatEs:string ="Servicio";
  User: user=new user();



  securityList: Object[];
  confortList:Object[];
  soundList:Object[];
  exteriorList:Object[];
  equipmentList:Object[];

  amenitiesList:Object[];
  ambientList:Object[];

  public security:Security = new Security();
  public confort:Confort=new Confort();
  public sound:Sound=new Sound();
  public exterior:Exterior=new Exterior();
  public equipment:Equipment=new Equipment();

  public amenities:Amenities=new Amenities();
  public ambient:Ambient= new Ambient();



  public motSecurity:Object[]=[];
  public motConfort:Object[]=[];
  public motSound:Object[]=[];
  public motExterior:Object[]=[];
  public motEquipment:Object[]=[];

  public propAmenities:Object[]=[];
  public propAmbient:Object[]=[];

  datosProductCondition;
  datosProductSaleConditions;
  datosProductFormDelivery;
  datosProductPaymentMethod;
  datosProductPagoEnvio;
  datosProductWarranty;

  title:string;
  description: string;
  video:string;
  msg:string="";
  data:object;
  itemImage:string;
  itemImageArray: Object[] = [];
  ambientes:number;
////
//product
productCondition:string="0";
productSaleConditions:string;
productQuantity:string;
productFormDelivery:string;
productFormDeliveryP:string;
productPaymentMethod:string;
productWarranty:string;
productPagoEnvio:string;
productPeso:string;
productVolumen:number;
//property
propertyTotalArea:string;
propertyDuildedArea:string;
propertyYear:string;
//motorized
motorizedBrand:string;
motorizedYear:string;
motorizedModel:string;
motorizedUnicoDue:string;
motorizedKilometers:number;
motorizedQuantity:number;

/****************** VARIABLES VALIDACION SERVICIOS *******************/
hidServicesTitle:boolean=true;
hidServiciosDescription:boolean=true;

/****************** VARIABLES VALIDACION PRODUCTOS *******************/
hidProductTitle:boolean=true;
hidProductQuantity:boolean=true;
hidProductPeso:boolean=true;
hidProductCondition:boolean=true;
hidProductVolumen:boolean=true;

productLength:number;
productWidth:number;
productHeight:number;

hidProductLength:boolean=true;
hidProductWidth:boolean=true;
hidProductHeight:boolean=true;

/****************** VARIABLES VALIDACION INMUEBLES *******************/
hidPropertyTitle:boolean=true;
hidPropertyTotalArea:boolean=true;
hidPropertyDuildedArea:boolean=true;

/****************** VARIABLES VALIDACION INMUEBLES *******************/
hidMotorizedTitle:boolean=true;
hidMotorizedBrand:boolean=true;
hidMotorizedYear:boolean=true;
hidMotorizedKilometers:boolean=true;
hidMotorizedQuantity:boolean=true;

/*********************************************************************/

public product: Product=new Product;
public property: Property=new Property;
public motorized: Motorized=new Motorized;
precioEnvio:number=527.8;
////
public item: Item=new Item();
  // imagenes con menor calidad
  //imagenes con menos calidad



  constructor(private elem:ElementRef,private sellService: SellService) { 
        
    this.datosProductCondition = ["Nuevo","Usado"];
    this.datosProductFormDelivery=["Ofrecer envíos por Yingul Envíos","También ofrecer retiro en persona"];
    this.datosProductPagoEnvio=["Pagado por él comprador","Pagado por él vendedor"];
    this.datosProductPaymentMethod=["Aceptar pagos solo por Yingul","Aceptar pagos por Yingul y cobro en persona"];
    this.datosProductSaleConditions=["Precio fijo","Subasta"];
    this.datosProductWarranty=["Con garantía","Sin garantía"];
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
        
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      console.log(JSON.stringify(this.User));
     
     console.log("username:"+this.User.username+" postalCode:"+this.User.password+" yng_Ubication:"+this.User.yng_Ubication.postalCode);
		}
    
  }

  ngOnInit() {
    if(this.typeCat=="Product"){
      this.typeCatEs="Producto";
    }
    if(this.typeCat=="Property"){
      this.typeCatEs="Inmueble";  
    }
    if(this.typeCat=="Motorized"){
      this.typeCatEs="Vehículo";
    }  
 
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
  sendDetail(){
      this.item.name=this.title;
      this.item.description=this.description;
      this.item.video=this.video;
      this.item.ambientes=this.ambientes;
      if(this.typeCat=="Service"){
        this.resetServicesHid();
        if(this.title==null || this.title==""){
          this.hidServicesTitle=false;
          this.elem.nativeElement.querySelector('#title').focus();
        }else if(this.description==null || this.description==""){
          this.hidServiciosDescription=false;
          this.elem.nativeElement.querySelector('#description').focus();
        }else{
          this.uploadImage();
          this.detailItemS.emit(this.item);
        }
      }


      if(this.typeCat=="Product"){
        this.resetProductHid();
        if(this.title==null || this.title==""){
          this.hidProductTitle=false;
          this.elem.nativeElement.querySelector('#title').focus();
        }else if(this.productCondition=="0"){
          this.hidProductCondition=false;
          this.elem.nativeElement.querySelector('#condition').focus();
        }else if(this.productQuantity==null || this.productQuantity==""){
          this.hidProductQuantity=false;
          this.elem.nativeElement.querySelector('#productQuantity').focus();
        }else if(this.productPeso==null || this.productPeso==""){
          this.hidProductPeso=false;
          this.elem.nativeElement.querySelector('#productPeso').focus();
        }else if(this.productLength==null || this.productLength==0){
          this.hidProductLength=false;
          this.elem.nativeElement.querySelector('#productLength').focus();
        }else if(this.productWidth==null || this.productWidth==0){
          this.hidProductWidth=false;
          this.elem.nativeElement.querySelector('#productWidth').focus();
        }else if(this.productHeight==null || this.productHeight==0){
          this.hidProductHeight=false;
          this.elem.nativeElement.querySelector('#productHeight').focus();
        }
        else{
          this.uploadImage();
          this.item.quantity=+this.productQuantity;
          this.detailItemS.emit(this.item);
          this.product.productCondition=this.productCondition;
          this.product.productSaleConditions=this.productSaleConditions;
          this.product.productFormDelivery=this.productFormDelivery;
          this.product.productPagoEnvio=this.productPagoEnvio;
          this.product.productPaymentMethod=this.productPaymentMethod;
          //revisar si el stock funciona bien this.product.productQuantity=this.productQuantity;
          this.product.productWarranty=this.productWarranty;
          this.product.productPeso=this.productPeso;
          this.product.producVolumen=""+this.productLength*this.productHeight*this.productWidth;
          this.product.productLength=this.productLength;
          this.product.productHeight=this.productHeight;
          this.product.productWidth=this.productWidth;
          this.product.productWeight=parseInt(this.product.productPeso);
          console.log( " this.product.productWeight:"+this.product.productWeight);
          this.detailProduct.emit(this.product);
        }
      }

      if(this.typeCat=="Property"){
        this.resetPropertyHid();
        if(this.title==null || this.title==""){
          this.hidPropertyTitle=false;
          this.elem.nativeElement.querySelector('#title').focus();
        }else if(this.propertyTotalArea==null || this.propertyTotalArea==""){
          this.hidPropertyTotalArea=false;
          this.elem.nativeElement.querySelector('#propertyTotalArea').focus();
        }else if(this.propertyDuildedArea==null || this.propertyDuildedArea==""){
          this.hidPropertyDuildedArea=false;
          this.elem.nativeElement.querySelector('#propertyDuildedArea').focus();
        }
        else{
          this.uploadImage();
          this.resetPropertyHid();
          this.item.duildedArea=+this.propertyDuildedArea;
          this.detailItemS.emit(this.item);
          this.property.propertyTotalArea=this.propertyTotalArea;
          this.property.propertyYear=this.propertyYear;
          this.property.propertyAmenities=this.propAmenities;
          this.property.propertyAmbient=this.propAmbient;
          this.detailProduct.emit(this.property);    
        }
      }
      if(this.typeCat=="Motorized"){
        this.resetMotorizedHid();
        if(this.title==null || this.title==""){
          this.hidMotorizedTitle=false;
          this.elem.nativeElement.querySelector('#title').focus();
        }else if(this.motorizedBrand==null || this.motorizedBrand==""){
          this.hidMotorizedBrand=false;
          this.elem.nativeElement.querySelector('#motorizedBrand').focus();
        }else if(this.motorizedYear==null || this.motorizedYear==""){
          this.hidMotorizedYear=false;
          this.elem.nativeElement.querySelector('#motorizedYear').focus();
        }else if(this.motorizedKilometers==null){
          this.hidMotorizedKilometers=false;
          this.elem.nativeElement.querySelector('#motorizedKilometers').focus();
        }else if(this.motorizedQuantity==null){
          this.hidMotorizedQuantity=false;
          this.elem.nativeElement.querySelector('#motorizedQuantity').focus();
        }
        else{
          this.uploadImage();
          this.resetMotorizedHid();
          this.item.quantity=this.motorizedQuantity;
          this.item.itemYear=+this.motorizedYear;
          this.detailItemS.emit(this.item);
          this.motorized.motorizedBrand=this.motorizedBrand;
          this.motorized.motorizedModel=this.motorizedModel;
          this.motorized.motorizedUnicoDue=this.motorizedUnicoDue;

          this.motorized.motorizedSecurity=this.motSecurity;
          this.motorized.motorizedConfort=this.motConfort;
          this.motorized.motorizedSound=this.motSound;
          this.motorized.motorizedExterior=this.motExterior;
          this.motorized.motorizedEquipment=this.motEquipment;
          this.item.kilometer=this.motorizedKilometers;
          
        // console.log("motorizedUnicoDue: "+ this.motorizedUnicoDue);
        this.detailProduct.emit(this.motorized);
        }
      }  
    

  }

  resetServicesHid(){
    this.hidServicesTitle=true;
    this.hidServiciosDescription=true;
  }

  resetProductHid(){
    this.hidProductTitle=true;
    this.hidProductQuantity=true;
    this.hidProductVolumen=true;
    this.hidProductPeso=true;
    this.hidProductCondition=true;
    this.hidProductLength=true;
    this.hidProductWidth=true;
    this.hidProductHeight=true;
  }

  resetPropertyHid(){
    this.hidPropertyTitle=true;
    this.hidPropertyTotalArea=true;
    this.hidPropertyDuildedArea=true;
  }

  resetMotorizedHid(){
    this.hidMotorizedTitle=true;
    this.hidMotorizedBrand=true;
    this.hidMotorizedYear=true;
    this.hidMotorizedKilometers=true;
    this.hidMotorizedQuantity=true;
  }

  back(){
    this.Back.emit('back');
  }
  public uploadImage(){
    let file = (<HTMLInputElement>document.getElementById("principalWebp")).value;
    let file2 = (<HTMLInputElement>document.getElementById("Webp2")).value;
    let file3 = (<HTMLInputElement>document.getElementById("Webp3")).value;
    let file4 = (<HTMLInputElement>document.getElementById("Webp4")).value;
    let file5 = (<HTMLInputElement>document.getElementById("Webp5")).value;
    let file6 = (<HTMLInputElement>document.getElementById("Webp6")).value;
    let file7 = (<HTMLInputElement>document.getElementById("Webp7")).value;
    let file8 = (<HTMLInputElement>document.getElementById("Webp8")).value;
    let file9 = (<HTMLInputElement>document.getElementById("Webp9")).value;
    let file10 = (<HTMLInputElement>document.getElementById("Webp10")).value;
    if(file!=null && file!=""){
      this.setImagePrincipal(file);
    }
    else{
      this.item.principalImage="sin";
    }
    if(file2!=null && file2!="" ){
      this.setImage(file2);
    }
    if(file3!=null && file3!=""){
      this.setImage(file3);
    }
    if(file4!=null && file4!=""){
      this.setImage(file4);
    }
    if(file5!=null && file5!=""){
      this.setImage(file5);
    }
    if(file6!=null && file6!=""){
      this.setImage(file6);
    }
    if(file7!=null && file7!=""){
      this.setImage(file7);
    }
    if(file8!=null && file8!=""){
      this.setImage(file8);
    }
    if(file9!=null && file9!=""){
      this.setImage(file9);
    }
    if(file10!=null && file10!=""){
      this.setImage(file10);
    }
  }
  public dataLoaded(data: any):void{
    this.elem.nativeElement.querySelector('#spinner').style.visibility='hidden';
  }
  
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  setImagePrincipal(data:string){
    this.item.principalImage=JSON.stringify(data);
    this.item.principalImage=this.item.principalImage.replace(/['"]+/g, '');
  }
  setImage(data:string){
    this.itemImage=JSON.stringify(data);
    this.itemImage=this.itemImage.replace(/['"]+/g, '');
    this.itemImageArray.push({"image":this.itemImage});
    this.item.itemImage=this.itemImageArray;
  }

  
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

 
  /*checkSecurity(security:Security){
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
    


  }*/

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

  capturar (){

    
  }
  popup:boolean=true;
  popupEligeDomicilio:boolean=true;
  popupEnvios:boolean=true;
  popupGarantia:boolean=true;
  popupCotizar:boolean=true;
  popupUbicacion:boolean=true;
  addprop1(){
    this.popupEligeDomicilio=this.popupEligeDomicilio!;
    console.log("popupEligeDomicilio:"+this.popupEligeDomicilio);

  }
  domi(){
    console.log("domi");
  }

  

  test(event) {
    
    console.log("event:"+event.target.checked);
    
    if(event.target.checked==true){
      this.consultarUbi();
      
    // this.popupEnvios=false;
    
    }
    else {
      this.popupEnvios=true;
      this.popupUbicacion=true;
    }
    
    console.log("popupEligeDomicilio:"+this.popupEnvios);

  }
  ubication:Ubication;
  consultarUbi(){
    this.sellService.ConsultarUbicavionUser(this.User.username).subscribe(
      res => {
        console.log(JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            
            console.log(JSON.stringify(this.ubication));
            this.popupEnvios=false;
            this.popupUbicacion=true;
        }
        else {
          this.popupEnvios=true;
          this.popupUbicacion=false;

        }
          },
          error => console.log(error)
    );
    
  }
  test2(event) {
    
    console.log("event:"+event.target.checked);
    if(event.target.checked==true)this.popupEligeDomicilio=false;
    else this.popupEligeDomicilio=true;
    //this.popupEligeDomicilio=event.target.checked!; // undefined
    console.log("popupEligeDomicilio:"+this.popupEligeDomicilio);

  }
  popGarantia(event) {
    
    console.log("event:"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=false;}
    else this.popupGarantia=true;
    console.log("popupGarantia:"+this.popupGarantia);

  }
  popSinGarantia(event) {
    
    console.log("event:"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=true;this.productWarranty="";}
    else this.popupGarantia=false;
    console.log("popupGarantia:"+this.popupGarantia);

  }

  capturarCondicion(productCondition : string){
  this.productCondition=productCondition;
  }

  capturarCondicionVenta(productCondition : string){
    this.productSaleConditions=productCondition;
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

  //popupEligeDomicilio:boolean;
  elijeDomicilio(){
    this.popupEligeDomicilio=false;

  }

  ToWebpPrincipal(){
    let files = this.elem.nativeElement.querySelector('#image-upload1').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("principalWebp")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview1")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp2(){
    let files = this.elem.nativeElement.querySelector('#image-upload2').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp2")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview2")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp3(){
    let files = this.elem.nativeElement.querySelector('#image-upload3').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp3")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview3")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp4(){
    let files = this.elem.nativeElement.querySelector('#image-upload4').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp4")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview4")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp5(){
    let files = this.elem.nativeElement.querySelector('#image-upload5').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp5")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview5")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp6(){
    let files = this.elem.nativeElement.querySelector('#image-upload6').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp6")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview6")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp7(){
    let files = this.elem.nativeElement.querySelector('#image-upload7').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp7")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview7")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp8(){
    let files = this.elem.nativeElement.querySelector('#image-upload8').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp8")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview8")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp9(){
    let files = this.elem.nativeElement.querySelector('#image-upload9').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp9")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview9")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  ToWebp10(){
    let files = this.elem.nativeElement.querySelector('#image-upload10').files;
    var D;
    var f = files[0];
    var sizeByte = f.size;
    var sizekiloByte = parseInt(sizeByte)/1024;
    var g;
    var i=document.createElement('img');
    i.onload=function(e){
    var b=document.createElement('canvas');
    b.width=i.width;b.height=i.height;
    var c=b.getContext("2d");
    c.drawImage(i,0,0);
    this.onload=function(){
      this.className='imG';
      var d=document.createElement('a');
      g=f.name.split('.');g.pop();
      d.download=g.join('')+'.jpeg';
      d.href=i.src;
      (<HTMLInputElement>document.getElementById("Webp10")).value=i.src;
      (<HTMLInputElement>document.getElementById("image-preview10")).style.backgroundImage = "url("+i.src+")";
      d.appendChild(this);
    }
    //aqui va la calidad
    var quality=0;
    if(sizekiloByte>=1120){
      quality=0;
    }
    if(sizekiloByte>=9000 && sizekiloByte<1120){
      quality=10;
    }
    if(sizekiloByte>=4860 && sizekiloByte<9000){
      quality=20;
    }
    if(sizekiloByte>=1620 && sizekiloByte<4860){
      quality=25;
    }
    if(sizekiloByte>=540 && sizekiloByte<1620){
      quality=30;
    }
    if(sizekiloByte>=180 && sizekiloByte<540){
      quality=35;
    }
    if(sizekiloByte>=60 && sizekiloByte<180){
      quality=40;
    }
    if(sizekiloByte>=20 && sizekiloByte<60){
      quality=60;
    }
    if(sizekiloByte>=0 && sizekiloByte<20){
      quality=80;
    }
    i.src=b.toDataURL('image/jpeg',quality*0.01);
    };
    i.src=window.URL.createObjectURL(f);
  }
  categoryType():string{
    if(this.typeCat=="Product"){
      this.typeCatEs="Producto";
    }
    if(this.typeCat=="Property"){
      this.typeCatEs="Inmueble";  
    }
    if(this.typeCat=="Motorized"){
      this.typeCatEs="Vehículo";
    }  
    return this.typeCatEs;
  }
}
