import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Router } from '@angular/router';
import { Service } from '../../../model/service';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';
import { Person } from '../../../model/person';
import { Motorized } from '../../../model/Motorized';
import { Property } from '../../../model/Property';
import { Ubication } from '../../../model/ubication';
import { Cotizar } from '../../../model/cotizar';
import { AndreaniCotizacion } from '../../../model/andreaniCotizacion';
import { AndreaniCotizacionRespuesta } from '../../../model/andreaniCotizacionRespuesta';
import { Cotizacion } from '../../../model/cotizacion';

@Component({
  selector: 'app-idetail',
  templateUrl: './idetail.component.html',
  styleUrls: ['./idetail.component.css']
})
export class IdetailComponent implements OnInit {
  @Input('itemId') localItemId:number;
  itemType:string;
  Item:Item=new Item();
 // Item: Object=new Object();
 Cotizar:Cotizar=new Cotizar(); 
  Service:Service= new Service();
  Product:Product= new Product();
  Motorized:Motorized= new Motorized();
  Property:Property= new Property();
  Seller:Person= new Person();
  usernameSeller:string;
  itemsBySeller: Object[]=[];
  imageByItem:Object[]=[];
  categoriesByItem:Object[]=[];
  queryByItem:Object[]=[];
  queryLength:number;
  query: string;
  oneQuery:Object= new Object();
  msg:string;
  spinner: boolean=false;
  showContent:boolean=false;
  answer: string;
  popup:boolean=true;
  popupCotizar:boolean=true;
  postalCode:string="";
  envioType:string;
  llegadaTime:string;
  priceSuc:string;
  priceDomi:string;
  provinceId:string="0";
  quant:number=1;

  constructor(private itemDetailService : ItemDetailService, private router : Router){ 
    
  }
  ngOnInit() {
    this.getImageByItem();
    this.getItemById();
    this.itemDetailService.getItemType(this.localItemId).subscribe(
			res => {
            this.itemType = JSON.parse(JSON.stringify(res))._body;
        
            this.getItem(this.itemType,this.localItemId);
            
      		},
      		error => console.log(error)
    ); 
    this.getItemById();
    this.getImageByItem();
    this.getCategoriesByItem();
    this.getQueryByItem();
    this.getSeller();
    this.envioType="Envío a todo el país"
    this.llegadaTime="Conocé los tiempos y las formas de envío.";
    this.priceDomi="";
    this.priceSuc="";
  }
  getItemById(){
    this.itemDetailService.getItemById(this.localItemId).subscribe(
			res => {
            this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
           // console.log("daniel: "+JSON.stringify(this.Item));
           // alert("daniel: "+JSON.stringify(this.Item));           
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
                console.log( "dani S: "+ JSON.stringify(res));
                break;
              case "Producto":
              console.log(JSON.parse(JSON.parse(JSON.stringify(res))._body));
                this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                console.log( "dani: "+ JSON.stringify(res));alert("dani: "+ JSON.stringify(res));
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
  getSeller(){
    this.itemDetailService.getSeller(this.localItemId).subscribe(
			res => {
            this.Seller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.usernameSeller=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.Seller)).yng_User)).username));
            this.getItemsBySeller();
      		},
      		error => console.log(error)
    );
  }
  getItemsBySeller() {
    this.itemDetailService.getItemsBySeller(this.usernameSeller).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }
  getImageByItem(){
    this.itemDetailService.getImageByItem(this.localItemId).subscribe(
			res => {
            this.imageByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    this.showContent=true;
  }

  getCategoriesByItem(){
    this.itemDetailService.getCategoriesByItem(this.localItemId).subscribe(
			res => {
            this.categoriesByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.categoriesByItem=this.categoriesByItem.sort();
           // console.log(JSON.stringify(this.categoriesByItem));
      		},
      		error => console.log(error)
    );
  }
  getQueryByItem(){
    
    this.itemDetailService.getQueryByItem(this.localItemId).subscribe(
			res => {
            this.queryByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.queryByItem = this.queryByItem.sort();
            this.queryLength= this.queryByItem.length;
            //console.log(JSON.stringify(this.queryByItem));
      		},
      		error => console.log(error)
    );
  }
  onSubmit(){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.router.navigate(['/login']);
		} else {
			this.spinner=true;
      //probablemente para crear un nuevo servicio funciones con el promise 
      /*var promise = new Promise((resolve, reject) => {
          setTimeout(() => {
          console.log("Async Work Complete");
          resolve();
        }, 100000);
      });*/
      this.oneQuery={"query":this.query,"user":JSON.parse(localStorage.getItem("user")),"yng_Item":{"itemId":this.localItemId}};
      this.itemDetailService.postQuery(this.oneQuery).subscribe(
        res => {
          this.msg = JSON.parse(JSON.stringify(res))._body;
          if(this.msg=='save'){
            location.reload();
          }
          else{
            alert(this.msg);
          } 
        },
        error => console.log(error)
      );
      this.spinner=false;
		}
    
  }
  retiroSuc(event){
    if(event.target.checked==true)this.shippingMethod="sucursal";
  }

  retiroDomicilio(event){
    if(event.target.checked==true)this.shippingMethod="domicilio";
  }
 
  aceptar(){
    this.answer="";
   
    
    console.log("shippingMethod:"+this.shippingMethod);
    if(this.shippingMethod=="domicilio"){
      this.envioType="Lo retiro en domicilio del vendedor";

      // {{Item.yng_Ubication.yng_Province.name}}
      //{{Item.yng_Ubication.yng_City.name}} 
      //
      this.llegadaTime=""+this.Item.yng_Ubication.yng_Province.name+"  "+this.Item.yng_Ubication.yng_City.name;

     
    }
    



    switch (this.shippingMethod) {
      case "domicilio":
      this.envioType="Lo retiro en domicilio del vendedor";
      this.llegadaTime=""+this.Item.yng_Ubication.yng_Province.name+"  "+this.Item.yng_Ubication.yng_City.name;
      this.popup=true;
        break;
      case "normal":
      this.envioType="Envío $ "+this.priceDomi;
      this.llegadaTime="Llega el martes 2 de enero.";
      this.popup=true;
        break;
      case "sucursal":
      this.envioType="Envío $ "+this.priceSuc;
      this.llegadaTime="Llega a la sucursal entre 48 y 96 hs. hábiles desde la imposición.";

      this.popup=true;
      if(this.andreaniCotizacionRespuesta==null)
      {alert("debe selecionar un metodo");
      }
      else{
        this.sendCotizacion();
       // this.typeShip.emit("envio");
  
      }
        break;
      default:
        alert("Seleccione un Método de envío");
    }
 

  }
  cotizarTemp1:Cotizacion;
  cotizacion:Cotizacion = new Cotizacion();
  sendCotizacion(){
   // this.cotizarTemp1=coti;
    console.log("envio: "+JSON.stringify(this.cotizacion));
    this.itemDetailService.sendCotizacionAndreani(this.cotizacion).subscribe(
      res => {
      

            if(JSON.parse(JSON.parse(JSON.stringify(res))._body)=="save"){alert("Cotizacion guardada");}
            else alert("Ocurio un error");
            
          },
          error => console.log(error)
    );
   

  }


  calcularCosto(){
    this.popup=false;
  }
  shippingMethod:string;
  public andreaniCotizacion:AndreaniCotizacion=new AndreaniCotizacion();

  buscar(){
    //if(this.provinceId!="0"&&this.postalCode!=""){
      if(this.postalCode!=""){
      this.Cotizar.codigo_postal=this.postalCode;
      this.Cotizar.provincia=this.provinceId;
      //this.Cotizar.$itemID=this.localItemId.toString();
      
      console.log("this.Item.yng_Ubication.$codAndreani:"+this.Item.yng_Ubication.codAndreani);
      this.Cotizar.codAndreani=this.Item.yng_Ubication.codAndreani;
      //this.Cotizar.$peso="";
      this.Cotizar.peso=this.Product.productPeso;
      this.Cotizar.volumen=this.Product.producVolumen;
      
      //this.Cotizar.
      this.andreaniCotizacion.username="";
      this.andreaniCotizacion.password="";             
      this.andreaniCotizacion.codigoDeCliente="";
      this.andreaniCotizacion.numeroDeContrato="";
      this.andreaniCotizacion.codigoPostal=this.postalCode;
      this.andreaniCotizacion.codigoDeSucursal=this.Item.yng_Ubication.codAndreani;
      this.andreaniCotizacion.peso=this.Product.productPeso;
      this.andreaniCotizacion.volumen=this.Product.producVolumen;
      this.andreaniCotizacion.valorDeclarado=""+this.Item.price; 
       
      //this.sendCotizar(this.Cotizar);
      this.sendCotizar2(this.andreaniCotizacion);
    }
    else {
      var codigoPostalSel="";
      //if(this.provinceId=="0")codigoPostalSel="\n -Una Provincia ";
      if(this.postalCode=="")codigoPostalSel=codigoPostalSel+"\n -Un Código postal";
      alert("Para realizar una cotización debe agregar:"+codigoPostalSel);

    }
  }

  getCity(provinceId : string){
    this.provinceId=provinceId;

  }

  cotizarTemp:Cotizar;
 cotizarTemp2:AndreaniCotizacion;
 andreaniCotizacionRespuesta:AndreaniCotizacionRespuesta= new AndreaniCotizacionRespuesta();
  tarifa:string;
  sendCotizar(coti:Cotizar){
   this.cotizarTemp=coti;
    console.log("Cotizar: "+JSON.stringify(this.cotizarTemp));
    this.itemDetailService.sendCotiza(this.cotizarTemp).subscribe(
			res => {
       // this.tarifa=JSON.parse(JSON.parse(JSON.stringify(res))._body);  
        console.log("tarifa: "+JSON.parse(JSON.stringify(res))._body);
        this.priceSuc=JSON.parse(JSON.stringify(res))._body;
            //this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
           // console.log("coti: "+JSON.stringify(res));
           if(this.priceSuc!=""){this.popupCotizar=false;}
           else {this.popupCotizar=true; alert("Código postal invalido");};
          },
      		error => console.log(error)
    );
   

 
  }
  sendCotizar2(coti:AndreaniCotizacion){
    /*this.cotizarTemp=coti;
     console.log("Cotizar: "+JSON.stringify(this.cotizarTemp));
     this.itemDetailService.sendCotiza(this.cotizarTemp).subscribe(
       res => {
        // this.tarifa=JSON.parse(JSON.parse(JSON.stringify(res))._body);  
         console.log("tarifa: "+JSON.parse(JSON.stringify(res))._body);
         this.priceSuc=JSON.parse(JSON.stringify(res))._body;
             //this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
            // console.log("coti: "+JSON.stringify(res));
            if(this.priceSuc!=""){this.popupCotizar=false;}
            else {this.popupCotizar=true; alert("Código postal invalido");};
           },
           error => console.log(error)
     );*/
    
 
     this.cotizarTemp2=coti;
     console.log("envio: "+JSON.stringify(this.cotizarTemp2));
     this.itemDetailService.sendCotizaAndreani(this.cotizarTemp2).subscribe(
       res => {
       
         this.andreaniCotizacionRespuesta=JSON.parse(JSON.parse(JSON.stringify(res))._body);
       
 
            if(this.andreaniCotizacionRespuesta.tarifa!=""){
              this.popupCotizar=false;
              this.priceSuc=this.andreaniCotizacionRespuesta.tarifa;
              //this.mostrarCotizacion();
              //this.mostrarSucursal();
             }
            else {
              this.popupCotizar=true; 
             alert("Código postal invalido");};
             console.log("else tarifa: ");
           },
           error => console.log(error)
     );
  
   }
 
  popupEntregaSuc:boolean=true;
  formasEntrega:string;
  entregaP(event){
   //this.formasEntrega
   if(event.target.checked==true){this.popupEntregaSuc=true;}
  else this.popupEntregaSuc=false;
   // console.log("entregaP:"+this.formasEntrega);
  }

  entregaS(event){
    if(event.target.checked==true){this.popupEntregaSuc=false;}
    else this.popupEntregaSuc=true;

    //console.log("entregaS:"+this.formasEntrega);
  }

  popupEntrega:boolean;
  aceptarEntrega(){
    console.log("entregaS:"+this.formasEntrega);
  }
  quantMas(){
    this.quant++;

  }
  quantMenos(){
    this.quant--;
  }

}
