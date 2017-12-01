import { Injectable, ElementRef, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { Item } from '../../../model/item';
import { Observer } from 'rxjs';

import { Product } from '../../../model/product';
import { Property } from '../../../model/Property';
import { Motorized } from '../../../model/Motorized';


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
productPaymentMethod:string;
productWarranty:string;
productPagoEnvio:string;
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
////
public item: Item=new Item();




  constructor(private elem:ElementRef) { 
    
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
      this.detailProduct.emit(this.product);
    }
    if(this.typeCat=="Property"){
      //this.property.
      this.property.$propertyDuildedArea=this.propertyDuildedArea;
      this.property.$propertyTotalArea=this.propertyTotalArea;
      this.property.$propertyYear=this.propertyYear
      this.detailProduct.emit(this.property);    
    }
    if(this.typeCat=="Motorized"){
      this.motorized.$motorizedBrand=this.motorizedBrand;
      this.motorized.$motorizedYear=this.motorizedYear;
      this.motorized.$motorizedModel=this.motorizedModel;
      this.motorized.$motorizedUnicoDue=this.motorizedUnicoDue;
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
    this.getBase64(file).then(
      data => this.setImagePrincipal(data)
    );
    this.getBase64(file2).then(
      data => this.setImage(data)
    );
    this.getBase64(file3).then(
      data => this.setImage(data)
    );
    this.getBase64(file4).then(
      data => this.setImage(data)
    );
    this.getBase64(file5).then(
      data => this.setImage(data)
    );
    this.getBase64(file6).then(
      data => this.setImage(data)
    );
    this.getBase64(file7).then(
      data => this.setImage(data)
    );
    this.getBase64(file8).then(
      data => this.setImage(data)
    );
    this.getBase64(file9).then(
      data => this.setImage(data)
    );
    this.getBase64(file10).then(
      data => this.setImage(data)
    );
    this.getBase64(file11).then(
      data => this.setImage(data)
    );
    this.getBase64(file12).then(
      data => this.setImage(data)
    );
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
}
