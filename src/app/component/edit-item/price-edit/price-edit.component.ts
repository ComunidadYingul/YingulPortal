import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit {
  @Input('itemId') localItemId:number;
  @Input('Item') Item:Item =new Item();
  title:string;
  description: string;
  video:string;
  msg:string="";
  data:object;
  itemImage:string;
  datosProductCondition;
  datosProductSaleConditions;
  datosProductFormDelivery;
  datosProductPaymentMethod;
  datosProductPagoEnvio;
  datosProductWarranty;
  product:Product=new Product();

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
popupGarantia:boolean=true;
nuevoB:boolean=false;
usadoB:boolean=true;
popupDescuento:boolean=true;
popupEnvios:boolean=true;
typeCat:string="Product";
priceDiscount:number;
priceNormal:number;
checkedDiscount:boolean=false;
price:number;
  constructor() { this.Item.name
   
  }

  ngOnInit() {
    console.log("Item: "+JSON.stringify(this.Item));
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  capturarCondicion(provinceId : string){
    this.productCondition=provinceId;
   }
   popSinGarantia(event) {
    if(event.target.checked==true)this.popupGarantia=true;
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
    if(event.target.checked==true){this.popupGarantia=false;this.productWarranty="";}
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
      this.product.productFormDelivery="YingulEnvios"      
      this.popupEnvios=false;
    }
    else {
      this.popupEnvios=true;
    }
  }

  test2(event) {   
    if(event.target.checked==true){
      this.product.productFormDelivery="YingulEnviosPersona";
    }
  }
  aceptarDiscount(){
    var a=this.priceNormal-this.priceDiscount;
    if(a>0){
    this.popupDescuento=true;
    this.checkedDiscount=false;
    this.product.yng_Item.priceDiscount=this.priceDiscount;
    this.product.yng_Item.priceNormal=this.priceNormal;
    this.price=this.priceDiscount;
    }
    else{
      alert("Los valores no son válidos");
    }
  }
  saveEdit(){
  }

  cancel(){
  }
  

}
