import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../model/item';
import { Cotizar } from '../../../model/cotizar';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AndreaniCot } from '../../../model/andreaniCot';
import { AndreaniCotizacion } from '../../../model/andreaniCotizacion';
import { AndreaniCotizacionRespuesta } from '../../../model/andreaniCotizacionRespuesta';
import { AndreaniSucursalRespuesta } from '../../../model/andreaniSucursalRespuesta';
import { Product } from '../../../model/product';
import { sucursalAndreani } from '../../../model/sucursalAndreani';
import { Cotizacion } from '../../../model/cotizacion';
import { Alert } from 'selenium-webdriver';
import { AndreaniEnvios } from '../../../model/andreaniEnvios';
import { Shipping } from '../../../model/shipping';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  @Input('quantity') quantity:number;
  @Output() typeShip = new EventEmitter();
  @Output() Cotizacion=new EventEmitter();
  @Output() typeEnvio= new EventEmitter();
  @Output() typeCotizacion= new EventEmitter();
  @Output() typeProduct=new EventEmitter();
  @Output() typePrice =new EventEmitter();
  andreaniEnvio:AndreaniEnvios=new AndreaniEnvios();
  shipping:Shipping =new Shipping();
  name:string="";
  phone:string="";
 
  branch:boolean=true;
  sendHome:boolean=true;
  priceSuc:string="";
  popupSucursal:boolean=true;
  //buscarCP:string;
  @Input('Item') Item:Item;


  //////////
  
  public cotizar:Object; 
  public andraniCot:AndreaniCot =new AndreaniCot();
  public andreaniCotizacion:AndreaniCotizacion=new AndreaniCotizacion();
  postalCode:string;
  Cotizar:Cotizar=new Cotizar();
  cotizarTemp:AndreaniCotizacion;
    sucursalTemp:AndreaniCot;
    andreaniCotizacionRespuesta:AndreaniCotizacionRespuesta=new AndreaniCotizacionRespuesta();
    andreaniSuc:Object[];
    andreaniSucursalRespuesta:AndreaniSucursalRespuesta=new AndreaniSucursalRespuesta();
    popupCotizar:boolean=true;
    Product:Product= new Product();
    sucursalAndre:string;
    resumen:string;
    direccion:string;
    horadeTrabajo:string; 



  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService) { 

  }

  
  ngOnInit() {
    this.shipping.typeShipping="home";
    //this.
    
  }

  check(typebuy:string){
    switch (typebuy) {
      case "branch":
        this.branch= false;
        this.sendHome=true;
        this.shipping.typeShipping="branch";
        break;
      case "home":
        this.branch= true;
        this.sendHome=true;
        this.andreaniCotizacionRespuesta=null;
        this.priceHiddem=true;
        this.shipping.typeShipping="home";
        break;
      case "sendHome":
        this.branch= true;
        this.sendHome=false;
        break;
      default:

    }
  }
  cotizacion:Cotizacion = new Cotizacion();
  sendTypeShip(){
    console.log("alert");
    if (this.branch==false){
    if(this.name==""&&this.phone=="" &&this.camSW==false){alert("Complete o seleccione otra opción de envío")}
    else{
    if(this.shipping.typeShipping=="branch")
    {

      //alert("debe selecionar un metodo");
   
      this.sendCotizacion();
      

    


    this.andreaniEnvio.provincia=""+this.Item.yng_Ubication.yng_Province.name;
    this.andreaniEnvio.localidad=""+this.Item.yng_Ubication.yng_City.name;
    this.andreaniEnvio.codigoPostalDestino=this.postalCode;
    this.andreaniEnvio.calle=this.Item.yng_Ubication.street;
    this.andreaniEnvio.numero=this.Item.yng_Ubication.number;
    this.andreaniEnvio.sucursalRetiro=this.cotizacion.sucursal;
    this.andreaniEnvio.sucursalCliente="";
    this.andreaniEnvio.nombreApellido="";
    this.andreaniEnvio.nombreApellidoAlternativo=""+this.name;
    this.andreaniEnvio.tipoDocumento="DNI";
    this.andreaniEnvio.numeroDocumento="";
    this.andreaniEnvio.email=this.Item.user.email;
    this.andreaniEnvio.numeroCelular="";
    this.andreaniEnvio.numeroTelefono=""+this.phone;

    this.andreaniEnvio.numeroTransaccion="";
    this.andreaniEnvio.tarifa=this.andreaniCotizacionRespuesta.tarifa;
    this.andreaniEnvio.valorACobrar="";
    this.andreaniEnvio.categoriaDistancia=this.andreaniCotizacionRespuesta.categoriaDistancia
    this.andreaniEnvio.categoriaFacturacion="1"
    this.andreaniEnvio.categoriaPeso=this.andreaniCotizacionRespuesta.categoriaPeso;
    this.andreaniEnvio.detalleProductosEntrega="";
    this.andreaniEnvio.detalleProductosRetiro="";
    this.andreaniEnvio.volumen=this.Product.producVolumen;
    this.andreaniEnvio.valorDeclarado=""+this.Item.price;
    this.andreaniEnvio.peso=this.Product.productPeso;



    console.log("andreaniEnvio:"+JSON.stringify(this.andreaniEnvio));
    
    
    
    this.typeCotizacion.emit(this.cotizacion);
    this.typeProduct.emit(this.Product);
    this.typePrice.emit(this.priceSuc);
    this.typeShip.emit("envio");
    this.typeEnvio.emit(this.shipping);
    this.shipping.yng_envio=this.andreaniEnvio;
    }
  }
    
  }
  else{
    this.typeCotizacion.emit(null);
    this.typeProduct.emit(this.Product);
    this.typePrice.emit(null);
    this.typeShip.emit("envio");
    this.typeEnvio.emit(this.shipping);
    //this.shipping.yng_envio=this.andreaniEnvio;

  }
  

  
  }


  buscar(){

    }
    popup:boolean=true;
    calcularCosto(){
      this.popup=false;
    }
    buscarCP:string="";
    //postalCode:string;
 


    buscarSucursales(){
      this.popupSucursal=true;
      this.andreaniSucursalRespuesta=null;
      this.andreaniCotizacionRespuesta=null;

      
            if(this.postalCode!=""){
              this.getItem("Producto",this.Item.itemId); 
            }
            else {
              var codigoPostalSel="";
              
              if(this.postalCode=="")codigoPostalSel=codigoPostalSel+"\n -Un Código postal";
              alert("Para realizar una cotización debe agregar:"+codigoPostalSel);
        
            }
    }

    sucursalLLenar(){
      console.log("this.postalCode:"+this.postalCode);
          
          this.andraniCot.username="";
          this.andraniCot.password="";
          this.andraniCot.codigoPostal=this.postalCode;
          this.andraniCot.provincia="";
          this.andraniCot.localidad="";
          this.sendSucursal(this.andraniCot);
    }
    cotizarLLenar(){

           
            
          this.andreaniCotizacion.username="";
          this.andreaniCotizacion.password="";             
          this.andreaniCotizacion.codigoDeCliente="";
          this.andreaniCotizacion.numeroDeContrato="";
          this.andreaniCotizacion.codigoPostal=this.postalCode;
          this.andreaniCotizacion.codigoDeSucursal=this.Item.yng_Ubication.codAndreani;
          this.andreaniCotizacion.peso=this.Product.productPeso;
          this.andreaniCotizacion.volumen=this.Product.producVolumen;
          this.andreaniCotizacion.valorDeclarado=""+this.Item.price;          
          this.sendCotizar(this.andreaniCotizacion);

    }


    
    sendCotizar(coti:AndreaniCotizacion){
      this.cotizarTemp=coti;
      console.log("envio: "+JSON.stringify(this.cotizarTemp));
      this.itemDetailService.sendCotizaAndreani(this.cotizarTemp).subscribe(
        res => {
        
          this.andreaniCotizacionRespuesta=JSON.parse(JSON.parse(JSON.stringify(res))._body);
        

             if(this.andreaniCotizacionRespuesta.tarifa!=""){

//this.andreaniSucursalRespuesta[0].resumen

               this.popupCotizar=false;
               this.mostrarCotizacion();
               this.mostrarSucursal();
              }
             else {
               this.popupCotizar=true; 
              alert("Código postal invalido");};
              console.log("else tarifa: ");
            },
            error => console.log(error)
      );
     
  
    }
    cotizarTemp1:Cotizacion;
    sendCotizacion(){

      console.log("envio: "+JSON.stringify(this.cotizacion));
      this.itemDetailService.sendCotizacionAndreani(this.cotizacion).subscribe(
        res => {  

              
            },
            error => console.log(error)
      );
     
     // this.andrean
    }

    sendSucursal(suc:AndreaniCot){
      
      this.sucursalTemp=suc;
      this.itemDetailService.sendSucursalAndreani(this.sucursalTemp).subscribe(
        res=>{
         
          this.andreaniSucursalRespuesta=JSON.parse(JSON.parse(JSON.stringify(res))._body);
         

          if(this.andreaniSucursalRespuesta.numero!=""){
            
          
            this.cotizarLLenar();
            //this.cotizacion.Descripcion="";
            this.cotizacion.direccion=this.andreaniSucursalRespuesta[0].direccion;
            this.cotizacion.horadeTrabajo=this.andreaniSucursalRespuesta[0].horadeTrabajo;
            this.cotizacion.latitud=this.andreaniSucursalRespuesta[0].latitud;
            this.cotizacion.longitud=this.andreaniSucursalRespuesta[0].longitud;
            this.cotizacion.mail=this.andreaniSucursalRespuesta[0].mail;
            this.cotizacion.numero=this.andreaniSucursalRespuesta[0].numero;
            this.cotizacion.responsable=this.andreaniSucursalRespuesta[0].responsable;
            this.cotizacion.resumen=this.andreaniSucursalRespuesta[0].resumen;
            this.cotizacion.sucursal=this.andreaniSucursalRespuesta[0].sucursal;
            this.cotizacion.telefono1=this.andreaniSucursalRespuesta[0].telefono1;
            this.cotizacion.telefono2=this.andreaniSucursalRespuesta[0].telefono2;
            this.cotizacion.telefono3=this.andreaniSucursalRespuesta[0].telefono3;
            this.cotizacion.tipoSucursal=this.andreaniSucursalRespuesta[0].tipoSucursal;
            this.cotizacion.tipoTelefono1=this.andreaniSucursalRespuesta[0].tipoTelefono1;
            this.cotizacion.tipoTelefono2=this.andreaniSucursalRespuesta[0].tipoTelefono2;
            this.cotizacion.tipoTelefono2=this.andreaniSucursalRespuesta[0].tipoTelefono3;
           // this.cotizacion.idUser=""+this.Item.user.userId;  
           this.cotizacion.idUser=""+localStorage.getItem('user')          
            this.cotizacion.itemId=""+this.Item.itemId;
            console.log("Daniel mas"+JSON.stringify(this.cotizacion.idUser));

            //alert("Item "+ JSON.stringify(this.Item.itemId));
            

          }
          else {}
          console.log("this.andreaniSucursalRespuesta.descripcion:"+this.andreaniSucursalRespuesta[0].descripcion);

        }
      );
      
    }



    camSW:boolean=false;
    getItem(itemType:string, itemId: number){
      this.itemDetailService.getItem(itemType,itemId).subscribe(
        res => {
              switch (itemType) {
                case "Producto":
                  this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                 // this.camSW=true;
                //  console.log( "Producto: "+this.Product.productPeso+" volumen:"+this.Product.producVolumen);
                break;


                default:
                  alert("error");
                 

              }
              if(this.Product.productPeso!=""){
                this.sucursalLLenar();
              }
            },
            error => console.log(error)
      )
    }


    mostrarSucursal(){
      this.sucursalAndre=""+this.andreaniSucursalRespuesta[0].resumen+"\r\n" + this.andreaniSucursalRespuesta[0].direccion+"\r\n" +this.andreaniSucursalRespuesta[0].horadeTrabajo;
      this.sucursalAndre="Andreani";
      this.resumen=this.andreaniSucursalRespuesta[0].resumen;
      this.direccion=this.andreaniSucursalRespuesta[0].direccion;
      this.horadeTrabajo=this.andreaniSucursalRespuesta[0].horadeTrabajo;
     

    }
    mostrarCotizacion(){
      console.log("this.Product.productPagoEnvio:"+this.Product.productPagoEnvio);
      if(this.Product.productPagoEnvio=="gratis") this.priceSuc=" Envio Gratis";
      else  this.priceSuc=this.andreaniCotizacionRespuesta.tarifa+"  Costo del envio";
      this.cotizacion.categoriaDistancia=this.andreaniCotizacionRespuesta.categoriaDistancia
      this.cotizacion.categoriaDistanciaId=this.andreaniCotizacionRespuesta.categoriaDistanciaId;
      this.cotizacion.categoriaPeso=this.andreaniCotizacionRespuesta.categoriaPeso;
      this.cotizacion.categoriaPesoId=this.andreaniCotizacionRespuesta.categoriaPesoId;
      this.cotizacion.pesoAforado=this.andreaniCotizacionRespuesta.pesoAforado;
      this.cotizacion.tarifa=this.andreaniCotizacionRespuesta.tarifa;
      this.popupSucursal=false;
      //alert(this.andreaniCotizacionRespuesta.tarifa);


    }
    priceHiddem:boolean=true;
    envioComprador(event){
      this.shipping.typeShipping="branch";
      this.camSW=true;
  
      if(event.target.checked==true) this.priceHiddem=false;
    }
    keyPressCP(event: any){
      const pattern = /[0-9]/;
      
          let inputChar = String.fromCharCode(event.charCode);
          if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
          }
    }
}
