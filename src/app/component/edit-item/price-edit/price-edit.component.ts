import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  capturarCondicion(provinceId : string){
    this.productCondition=provinceId;
   }
   popSinGarantia(event) {
  
    console.log("event:"+event.target.checked);
    if(event.target.checked==true)this.popupGarantia=true;
    else this.popupGarantia=false;
    console.log("popupGarantia:"+this.popupGarantia);
  
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
  
    console.log("event:"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=false;}
    else this.popupGarantia=true;
    console.log("popupGarantia:"+this.popupGarantia);
  
  }
  saveEdit(){
  }

  cancel(){
  }

}
