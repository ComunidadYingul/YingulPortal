import { Injectable, ElementRef, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
////
//product
productCondition:string;
productSaleConditions:string;
productQuantity:string;
productFormDelivery:string;
productFormDeliveryP:string;
productPaymentMethod:string;
productWarranty:string;
productPagoEnvio:string;
productPeso:string;
productVolumen:string;
//property
propertyTotalArea:string;
propertyDuildedArea:string;
propertyYear:string;
//motorized
motorizedBrand:string;
motorizedYear:string;
motorizedModel:string;
motorizedUnicoDue:string;

public product: Product=new Product;
public property: Property=new Property;
public motorized: Motorized=new Motorized;
precioEnvio:number=527.8;
////
public item: Item=new Item();




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
    this.uploadImage();
    this.item.$name=this.title;
    this.item.$description=this.description;
    this.item.$video=this.video;
    this.detailItemS.emit(this.item);
    if(this.typeCat=="Product"){
      //this.item.$name =this.title;
      this.product.$productCondition=this.productCondition;
      this.product.$productSaleConditions=this.productSaleConditions;
      this.product.$productFormDelivery=this.productFormDelivery;
      this.product.$productPagoEnvio=this.productPagoEnvio;
      this.product.$productPaymentMethod=this.productPaymentMethod;
      this.product.$productQuantity=this.productQuantity;
      this.product.$productWarranty=this.productWarranty;
      this.product.$productPeso=this.productPeso;
      this.product.$producVolumen=this.productVolumen;
      this.detailProduct.emit(this.product);
    }
    if(this.typeCat=="Property"){
      //this.property.
      this.property.$propertyDuildedArea=this.propertyDuildedArea;
      this.property.$propertyTotalArea=this.propertyTotalArea;
      this.property.$propertyYear=this.propertyYear;
      this.property.$propertyAmenities=this.propAmenities;
      this.property.$propertyAmbient=this.propAmbient;


      this.detailProduct.emit(this.property);    
    }
    if(this.typeCat=="Motorized"){
      this.motorized.$motorizedBrand=this.motorizedBrand;
      this.motorized.$motorizedYear=this.motorizedYear;
      this.motorized.$motorizedModel=this.motorizedModel;
      this.motorized.$motorizedUnicoDue=this.motorizedUnicoDue;

      this.motorized.$motorizedSecurity=this.motSecurity;
      this.motorized.$motorizedConfort=this.motConfort;
      this.motorized.$motorizedSound=this.motSound;
      this.motorized.$motorizedExterior=this.motExterior;
      this.motorized.$motorizedEquipment=this.motEquipment;
     // console.log("motorizedUnicoDue: "+ this.motorizedUnicoDue);
     this.detailProduct.emit(this.motorized);
    }  
    

  }
  back(){
    this.Back.emit('back');
  }
  public uploadImage():void{
    this.elem.nativeElement.querySelector('#spinner').style.visibility='visible';
    let files = this.elem.nativeElement.querySelector('#image-upload1').files;
    let file = files[0];
    let files2 = this.elem.nativeElement.querySelector('#image-upload2').files;
    let file2 = files2[0];
    let files3 = this.elem.nativeElement.querySelector('#image-upload3').files;
    let file3 = files3[0];
    let files4 = this.elem.nativeElement.querySelector('#image-upload4').files;
    let file4 = files4[0];
    let files5 = this.elem.nativeElement.querySelector('#image-upload5').files;
    let file5 = files5[0];
    let files6 = this.elem.nativeElement.querySelector('#image-upload6').files;
    let file6 = files6[0];
    let files7 = this.elem.nativeElement.querySelector('#image-upload7').files;
    let file7 = files7[0];
    let files8 = this.elem.nativeElement.querySelector('#image-upload8').files;
    let file8 = files8[0];
    let files9 = this.elem.nativeElement.querySelector('#image-upload9').files;
    let file9 = files9[0];
    let files10 = this.elem.nativeElement.querySelector('#image-upload10').files;
    let file10 = files10[0];
    let files11 = this.elem.nativeElement.querySelector('#image-upload11').files;
    let file11 = files11[0];
    let files12 = this.elem.nativeElement.querySelector('#image-upload12').files;
    let file12 = files12[0];
    if(file!=null){
      this.getBase64(file).then(
        data => this.setImagePrincipal(data)
      );
    }
    else{
      this.item.$principalImage="sin";
    }
    if(file2!=null){
      this.getBase64(file2).then(
        data => this.setImage(data)
      );
    }
    if(file3!=null){
      this.getBase64(file3).then(
        data => this.setImage(data)
      );
    }
    if(file4!=null){
      this.getBase64(file4).then(
        data => this.setImage(data)
      );
    }
    if(file5!=null){
      this.getBase64(file5).then(
        data => this.setImage(data)
      );
    }
    if(file6!=null){
      this.getBase64(file6).then(
        data => this.setImage(data)
      );
    }
    if(file7!=null){
      this.getBase64(file7).then(
        data => this.setImage(data)
      );
    }
    if(file8!=null){
      this.getBase64(file8).then(
        data => this.setImage(data)
      );
    }
    if(file9!=null){
      this.getBase64(file9).then(
        data => this.setImage(data)
      );
    }
    if(file10!=null){
      this.getBase64(file10).then(
        data => this.setImage(data)
      );
    }
    if(file11!=null){
      this.getBase64(file11).then(
        data => this.setImage(data)
      );
    }
    if(file12!=null){
      this.getBase64(file12).then(
        data => this.setImage(data)
      );
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
  setImagePrincipal(data:object){
    this.item.$principalImage=JSON.stringify(data);
    this.item.$principalImage=this.item.$principalImage.replace(/['"]+/g, '');
  }
  setImage(data:object){
    this.itemImage=JSON.stringify(data);
    this.itemImage=this.itemImage.replace(/['"]+/g, '');
    this.itemImageArray.push({"image":this.itemImage});
    this.item.$itemImage=this.itemImageArray;
  }

  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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
  if(event.target.checked==true)this.popupGarantia=true;
  else this.popupGarantia=false;
  console.log("popupGarantia:"+this.popupGarantia);

}

capturarCondicion(provinceId : string){
 this.productCondition=provinceId;
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

//popupEligeDomicilio:boolean;
elijeDomicilio(){
  this.popupEligeDomicilio=false;

}


}
