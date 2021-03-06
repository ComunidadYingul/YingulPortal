﻿import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
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
import { user } from '../../../model/user';
import { Branch } from '../../../model/branch';
import { Quote } from '../../../model/quote';
import { SellService } from '../../../service/sell.service';
import { Ubication } from '../../../model/ubication';
import { Province } from '../../../model/province';
import { BuyService } from '../../../service/buy.service';
import { City } from '../../../model/city';
import { Barrio } from '../../../model/barrio';
import { Country } from '../../../model/country';
import { Network } from '../../../model/Network';
import { Person } from '../../../model/person';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
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
  lastName:string="";
  phone:string="";
  shippingMethod;
  branch:boolean=true;
  sendHome:boolean=true;
  priceSuc:string="";
  popupSucursal:boolean=true;
  popupSucursalHome:boolean=true;
  checke:boolean=false;
 
  @Input('Item') Item:Item;

  /****************** VARIABLES VALIDACION SERVICIOS *******************/
  /*hidPhone:boolean=true;
  hidPrice:boolean=true;
  hidCountry:boolean=true;
  hidProvince:boolean=true;
  hidCity:boolean=true;
  hidStreet:boolean=true;
  hidNumber:boolean=true;*/
  radioSucursal:boolean=false;
  popup_g:boolean=true;

  /*hidProductSalesCondition:boolean=true;
  hidProductPaymentMethod:boolean=true;
  hidYingulExpress:boolean=true;*/
  hidIngresarDomicilio:boolean=true;

  hidUbicationCountry:boolean=true;
  hidUbicationProvince:boolean=true;
  hidUbicationCity:boolean=true;
  hidUbicationStreet:boolean=true;
  hidUbicationNumber:boolean=true;
  hidUbicationPhone:boolean=true;
  hidUbicationDni:boolean=true;
  hidUbicationAditional:boolean=true;
  documentNumber:string="";
  documentType:string="DNI";
  telephone:string="";

  hidBuscarSucursal:boolean=true;
  hidSucursal:boolean=true;
  hidName:boolean=true;
  hidlastName:boolean=true;
  hidPhone:boolean=true;

  hidRadioSucursal:boolean=true;


  //////////
  
  public cotizar:Object; 
  public andraniCot:AndreaniCot =new AndreaniCot();
  public andreaniCotizacion:AndreaniCotizacion=new AndreaniCotizacion();
  postalCode:string="";
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
    useri:user=new user();
    branchS:Branch =new Branch();
    amenitiesList:Object[];
    quoteS:Quote=new Quote();
    userTemp:user =new user();
    userTemp2:user =new user();
    quoteList:Object[];
    priceSuc2:string;
    userName;
    ubication:Ubication=new Ubication();
    popupUbication:boolean=true;
    btnCP:boolean=false;
    cityHid:boolean;
    codigoPostalE:string;
    cityList: Object[];
    barrioHid:boolean;
    provinciaCP:string;
    provinciaID:number;
    public province:Province = new Province();
    Country:string;
    department:string;
    withinStreets:string;
    number:string;
    street:string;
    aditional:string;
    swUb:boolean;
    User: user=new user();
    msg:string;
    public city:City = new City();
    public barrio:Barrio = new Barrio();
    barrioList : Object[];
    countryList:object[];
    countryName:string;
    country:Country=new Country();
    countryTemp:Country=new Country();
    countryHidden:boolean=false;
    cityTem:City=new City();
    provinceList: Object[];
    provin:string;
    popupUbication1:boolean=true;
    hiddenHomeButton:boolean=true;
    popupSendHome:boolean=true;
    maxDocumentNumber:number=8;
  constructor(private elem:ElementRef,private buyService: BuyService,private route:ActivatedRoute,private itemDetailService : ItemDetailService,private sellService: SellService,private router: Router) { 
    this.cityHid=true;
    console.log("Cotizacion"+JSON.stringify(this.shipping));
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }  
    }

  
  ngOnInit() {
    this.shipping.typeShipping="home";
    this.useri=JSON.parse(localStorage.getItem("user"));
    this.userName=this.useri.username;
    console.log("this.userName"+this.userName);
    this.sellService.ConsultarUbicavionUser(this.userName).subscribe(
      res => {
        console.log("res:"+JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);           
           console.log("ubication:"+ JSON.stringify(this.ubication));
           this.popupUbication1=true;
           this.countryAll();
        }
        else {
          this.popupUbication1=false;
          this.countryAll();
        }
          },
          error => console.log(error)
    );
    if(this.Item.productPagoEnvio=="gratis"){

    }
  }

  check(typebuy:string){
    this.resetSucursal();
    switch (typebuy) {
      case "branch":
        this.branch= false;
        this.sendHome=true;
        this.shipping.typeShipping="branch";
        this.hiddenHomeButton=true;
        this.popupSendHome=true;
        this.hiddenSwOtherHome=true;
        this.popupSucursal=true;
        this.popupSucursalHome=true;
        break;
      case "home":
        this.branch= true;
        this.sendHome=true;
        this.andreaniCotizacionRespuesta=null;
        this.priceHiddem=true;
        this.shipping.typeShipping="home";
        this.checke=false;
        this.hiddenHomeButton=true;
        this.popupSendHome=true;
        this.hiddenSwOtherHome=true;
        this.popupSucursal=true;
        this.popupSucursalHome=true;
        break;
      case "sendHome":
        this.branch= true;
        this.sendHome=false;
        this.checke=false;
        this.shipping.typeShipping="branchHome";
        //this.popupUbication1=false;
        this.consultarUbi();
        this.hiddenHomeButton=false;
        this.popup
        this.popupSendHome=true;
        this.hiddenSwOtherHome=true;
        break;
      case "fedex":
      this.branch= true;
      this.sendHome=false;
      break;
      default:

    }
  }
  cotizacion:Cotizacion = new Cotizacion();
  buscar(){

    }
    popup:boolean=true;
    calcularCosto(){
      this.popup=false;
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
          this.quoteS.rate=0;
          this.quoteS.respuesta="";
          this.userTemp=this.Item.user;
         
          this.Item.user=null;
          this.userTemp2.username=this.userTemp.username;
          //
          this.Item.user=this.userTemp2;

          this.quoteS.yng_Item=this.Item;

        
          ///this.quoteS.yng_Item.user=null;
          this.useri=JSON.parse(localStorage.getItem("user"));
          this.quoteS.yng_User=this.useri;
          
          this.sendQuote(this.quoteS);
    }


    
    sendCotizar(coti:AndreaniCotizacion){
      this.cotizarTemp=coti;
      console.log("envio1: "+JSON.stringify(this.cotizarTemp));
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

      console.log("envio55: "+JSON.stringify(this.cotizacion));
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

            //alert("Item "+ JSON.stringify(localStorage.getItem('user')));
            this.useri=JSON.parse(localStorage.getItem("user"));
            console.log("Daniel mas:"+this.useri.username);
            this.cotizacion.idUser=""+this.useri.username; 


          }
          else {}
          console.log("this.andreaniSucursalRespuesta.descripcion:"+this.andreaniSucursalRespuesta[0].descripcion);

        }
      );
      this.sucursalTemp.codigoPostal="";
      this.sucursalTemp.provincia="salta";
      this.itemDetailService.sendData(this.sucursalTemp).subscribe(
        res=>{
          this.amenitiesList=JSON.parse(JSON.parse(JSON.stringify(res))._body);
         // console.log(JSON.stringify(this.amenitiesList));
        },
        error => console.log(error)
      );
    }



    camSW:boolean=false;
    getItem(itemType:string, itemId: number){
      this.itemDetailService.getItem(itemType,itemId).subscribe(
        res => {
              switch (itemType) {
                case "Producto":
                  this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                  break;
                  default:
                  alert("error");
                }
              if(this.Product.productPeso!=""){
               // this.sucursalLLenar();
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
      else  this.priceSuc=this.priceSuc2+"  Costo del envio";
      this.popupSucursal=false;
      if( this.shipping.typeShipping=="branchHome"){
        this.popupSucursalHome=false;
      }      
      this.popup_g=true;
    }
    priceHiddem:boolean=true;
    envioComprador(event,yng_Quote:Quote){
      
      this.shipping.typeShipping="branch";
      this.camSW=true;
      if(event.target.checked==true) {
        this.priceHiddem=false;
        this.shipping.yng_Quote=yng_Quote;
       // this.priceSuc2=""+yng_Quote.rate;
        if(this.Product.productPagoEnvio=="gratis") this.priceSuc=" Envio Gratis";
      else  this.priceSuc=yng_Quote.rate+"  Costo del envio";
      }
    }
    keyPressCP(event: any){
      const pattern = /[0-9]/;      
          let inputChar = String.fromCharCode(event.charCode);
          if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
          }
    }
    sendQuote(yng_Quote:Quote){
      console.log("yng_Quote: "+JSON.stringify(yng_Quote));
      this.itemDetailService.sendQuote(yng_Quote).subscribe(
        res => {
            this.quoteList=JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log("JSON qoute responce:"+JSON.stringify(this.quoteList));

            if(this.quoteList.length>0){
              console.log("yng_Branch:"+JSON.parse(JSON.stringify(this.quoteList[0])).yng_Branch);
              console.log("respuesta"+JSON.parse(JSON.stringify(this.quoteList[0])).respuesta);
              var branchRes=JSON.parse(JSON.stringify(this.quoteList[0])).yng_Branch;
              if (branchRes!=null){
                this.popupCotizar=false;
                this.mostrarCotizacion();
              }
              else{
                this.popup_g=true;
                this.quoteList=null;
                alert("No existe una sucursal cercana");
              }
            }
            else {
              this.popup_g=true;
              this.popupCotizar=true; 
              alert("Código postal invalido");
            }
          },
        error => console.log(error)
      ); 
    }
    quoteSend(){
      this.hidBuscarSucursal=true;
      if(this.postalCode!=""){
        this.popup_g=false;
        this.popupSucursal=true;
        this.popupSucursalHome=true;
        this.getItem("Producto",this.Item.itemId);
        this.quoteS.respuesta="";
        this.userTemp=this.Item.user; 
        this.Item.user=null;
        this.userTemp2.username=this.userTemp.username;
        this.Item.user=this.userTemp2;
        this.quoteS.yng_Item=this.Item;
        this.useri=JSON.parse(localStorage.getItem("user"));
        this.useri.yng_Ubication.postalCode=this.postalCode;
        this.quoteS.yng_User=this.useri;
        this.quoteS.quantity=this.quantity;
        this.sendQuote(this.quoteS);
      }
      else {
        var codigoPostalSel="";
        
        if(this.postalCode=="")codigoPostalSel=codigoPostalSel+"\n -Un Código postal";
        //alert("Para realizar una cotización debe agregar:"+codigoPostalSel);
        this.hidBuscarSucursal=false;
      }
     
    }

    resetSucursal(){
      this.hidSucursal=true;
      this.hidName=true;
      this.hidlastName=true;
      this.hidPhone=true;
      this.hidBuscarSucursal=true;
      this.hidRadioSucursal=true;
    }

    sendTypeShip2(){
      console.log("this.name:"+this.name);
      this.resetSucursal();
      if (this.branch==false){
        if(this.popupSucursal==true){
          this.hidBuscarSucursal=false;
          this.elem.nativeElement.querySelector('#postalCode').focus();
        }else if(this.camSW==false){
          this.hidSucursal=false;
          this.elem.nativeElement.querySelector('#rbSucursal').focus();
        }else if(this.name=="" || this.name==null){
          this.hidName=false;
          this.elem.nativeElement.querySelector('#name').focus();
        }if(this.lastName=="" || this.lastName==null){
          this.hidlastName=false;
          this.elem.nativeElement.querySelector('#lastName').focus();
        }else if(this.phone=="" || this.phone==null){
          this.hidPhone=false;
          this.elem.nativeElement.querySelector('#phone').focus();
        }
        else {
          if(this.shipping.typeShipping=="branch")
          {
            this.typeCotizacion.emit(this.cotizacion);
            this.typeProduct.emit(this.Product);
            this.typePrice.emit(this.priceSuc);
            this.typeShip.emit("envio");          
            this.shipping.nameContact=this.name;
            this.shipping.phoneContact=this.phone;
            this.shipping.lastName=this.lastName;
            this.shipping.yng_Quote.yng_Item=null;
            this.shipping.yng_Quote.yng_User=null;
            this.shipping.yng_Shipment.yng_User.yng_Ubication.postalCode=this.postalCode;
            console.log("shipping: "+JSON.stringify(this.shipping));
            this.typeEnvio.emit(this.shipping);
          }
        }      
      }
      else{
        if(this.sendHome==false){
          if(this.popupSendHome==true){
            console.log("this.sendHome==false");
            this.hidBuscarSucursal=false;
            this.elem.nativeElement.querySelector('#postalCode').focus();
          }else if(this.camSW==false){
            this.hidSucursal=false;
            this.elem.nativeElement.querySelector('#rbSucursal').focus();
          }else if(this.name=="" || this.name==null){
            this.hidName=false;
            this.elem.nativeElement.querySelector('#name').focus();
          }if(this.lastName=="" || this.lastName==null){
            this.hidlastName=false;
            this.elem.nativeElement.querySelector('#lastName').focus();
          }else if(this.phone=="" || this.phone==null){
            this.hidPhone=false;
            this.elem.nativeElement.querySelector('#phone').focus();
          }
          else {
            if(this.shipping.typeShipping=="branchHome")
            {
              this.typeCotizacion.emit(this.cotizacion);
              this.typeProduct.emit(this.Product);
              this.typePrice.emit(this.priceSuc);
              this.typeShip.emit("envio");          
              this.shipping.nameContact=this.name;
              this.shipping.phoneContact=this.phone;
              this.shipping.lastName=this.lastName;
              this.shipping.yng_Quote.yng_Item=null;
              this.shipping.yng_Quote.yng_User=null;
              this.shipping.yng_Shipment.yng_User.yng_Ubication.postalCode=this.postalCode;
              this.shipping.yng_Shipment.yng_User.yng_Ubication.street=this.ubication.street;
              this.shipping.yng_Shipment.yng_User.yng_Ubication.number=this.ubication.number;
              console.log("shipping: "+JSON.stringify(this.shipping));
              this.typeEnvio.emit(this.shipping);
            }
          }
          }
          else{
            this.typeCotizacion.emit(null);
            this.typeProduct.emit(this.Product);
            this.typePrice.emit(null);
            this.typeShip.emit("envio");
            console.log("shipping: "+JSON.stringify(this.shipping));
            this.typeEnvio.emit(this.shipping);
          }       

      }


      
    }
    buscarCP(){
      if(this.codigoPostalE==""){alert("Introduzca un Código Postal");}
      else{
  
        this.cityList=[];
  
        this.sellService.getCP(this.codigoPostalE).subscribe(
          res => {
                this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
  
                
    
                if(JSON.stringify(this.cityList)=="[]"){
                  
                  this.cityHid=true;
                  this.barrioHid=true;
                  alert("no se encontro el codigo postal ");
                } 
                else{
                  this.provinciaCP=JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.name);
                  this.provinciaID=parseInt(JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.provinceId));
                
                  this.province.provinceId=this.provinciaID;
                  
                  this.cityHid=false;
                  this.postalCode=this.codigoPostalE;
                  this.btnCP=true;  
                               
                }
              },
              error => console.log(error)
        )
      }
  
    }
    cambiarCP(){
      this.cityHid=true;
      this.postalCode="";
      this.number="";
      this.street="";
      this.aditional="";
      this.department="";
      this.withinStreets="";
      this.btnCP=false;
    }
    aceptar(){  
      const patron = /^[0-9]{2}.[0-9]{3}.[0-9]{3}$/; 
      this.resetHidFormUbication();
      if(this.country.countryId==null || this.country.countryId==0){
        this.hidUbicationCountry=false;
      }else if(this.province.provinceId==null||this.province.provinceId==0){  
        this.hidUbicationProvince=false;
      }else if(this.city.cityId==null||this.city.cityId==0){  
        this.hidUbicationCity=false;
      }else if(this.street==null || this.street==""){  
        this.hidUbicationStreet=false;
      }else if(this.number==null||this.number==""){  
        this.hidUbicationNumber=false;
      }else if(this.aditional==null||this.aditional==""){  
        this.hidUbicationAditional=false;
      }else if(this.telephone==null||this.telephone==""){  
        this.hidUbicationPhone=false;
      }else if(!patron.test(this.documentNumber)){  
        this.hidUbicationDni=false;
      }
      else{
        console.log("this.street:"+this.street);
        this.ubication.street=this.street;
        this.ubication.number=this.number;
        this.ubication.postalCode= this.postalCode;
        this.ubication.aditional=this.aditional;
        this.ubication.yng_Province=this.province;
        this.ubication.yng_City=this.city;
        this.ubication.yng_Barrio=this.barrio;
        this.ubication.department=this.department;
        this.ubication.withinStreets=this.withinStreets;
        this.ubication.yng_Country=this.country;
        //alert("ubication"+JSON.stringify(this.ubication));
        console.log("ubication"+JSON.stringify(this.ubication));
        this.User.yng_Ubication=this.ubication;
        this.User.phone=this.telephone;
        this.User.documentNumber=this.documentNumber.split(".").join("");
        this.User.documentType=this.documentType;
        console.log("ubication"+JSON.stringify(this.User));
        if(this.swSendOtherHome==true){
          this.popupSendHome=false;
          this.popup_g=false;
          this.popupSucursal=true;
          this.popupSucursalHome=true;
          this.getItem("Producto",this.Item.itemId);
          this.quoteS.respuesta="";
          this.userTemp=this.Item.user; 
          this.Item.user=null;
          this.userTemp2.username=this.userTemp.username;
          this.Item.user=this.userTemp2;
          this.quoteS.yng_Item=this.Item;
          this.useri=JSON.parse(localStorage.getItem("user"));
          this.postalCode=this.ubication.postalCode;
          this.useri.yng_Ubication.postalCode=this.postalCode;
          this.useri.yng_Ubication.street=this.ubication.street;
          this.useri.yng_Ubication.number=this.ubication.number;
          this.useri.yng_Ubication.withinStreets=this.ubication.withinStreets;
          this.quoteS.yng_User=this.useri;
          this.quoteS.quantity=this.quantity;
          console.log("da"+this.shipping.typeShipping);
          if( this.shipping.typeShipping=="branchHome"){
            this.sendQuoteBranchHome(this.quoteS);
          }
          else{
              this.popup_g=true;            
          }

        }
        else{
          this.buyService.setUserUbicationEditPersonalInfo(this.User).subscribe(
            res => {
                  this.msg = JSON.parse(JSON.stringify(res))._body;
                  if(this.msg!=""){
                   this.popupUbication1=true;
                   this.popup_g=true;
                   this.consultarUbi();
                  }
                  else{
                    alert("Algo salio mal intente mas tarde");
                  } 
                },
                error => console.log(error)
          );

        }

      this.popupUbication1=true;
      }  
    }

    resetHidFormUbication(){
      this.hidUbicationCountry=true;
      this.hidUbicationProvince=true;
      this.hidUbicationCity=true;
      this.hidUbicationStreet=true;
      this.hidUbicationNumber=true;
    }

    getBarrio(cityId : number){
      this.city.cityId=cityId;
      console.log("cityId:"+cityId);
      var ret="";
      for(let c of this.cityList){
        this.cityTem=JSON.parse(JSON.stringify(c));
        if(cityId==this.cityTem.cityId){ 
          ret=this.cityTem.codigopostal;
        }
      }
      console.log("ret:"+ret);
      this.postalCode=ret;
      this.barrioList=[];
      this.sellService.getBarrio(cityId).subscribe(
        res => {
              this.barrioList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              if(JSON.stringify(this.barrioList)=="[]"){
                this.barrioHid=true;
              }
              else{
                this.barrioHid=false;
              }
            },
            error => console.log(error)
      )
    }
    countryAll(){
      this.sellService.ConsultarCountry().subscribe(
        res => {
          console.log("resCountry:"+JSON.stringify(res));
          if(JSON.parse(JSON.stringify(res))._body!=""){
              this.countryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);           
             console.log("ubication:"+ JSON.stringify(this.ubication));
             this.isBussines()
            // this.popupUbication=true;
          }
          else {
            //this.popupUbication=false;
            
          }
          
            },
            error => console.log(error)
      );


    }
    getCountry(countryId : number){
      this.countryHidden=true;
      var ret;
    for(let p of this.countryList){
      this.countryTemp=JSON.parse(JSON.stringify(p));
      if(countryId==this.countryTemp.countryId){              
        console.log("contry: " +JSON.stringify(this.countryTemp));
        this.country=this.countryTemp;
      }     
      this.countryName=this.country.name     
    }
  }
  getProvince(countryId:number){
    this.country.countryId=countryId;
    this.provinceList=null;
    this.cityHid=true;
    this.barrioHid=true;
    this.sellService.getProvinces(countryId).subscribe(
			res => {
            this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            //this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);

      		},
      		error => console.log(error)
    )
  }
  getCity(provinceId : number){
    this.province.provinceId=provinceId;
     this.cityList=[];
     this.sellService.getCities(provinceId).subscribe(
       res => {
             this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
             this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);
            // alert("this.provin:"+this.provin);
             if(JSON.stringify(this.cityList)=="[]"){
               this.cityHid=true;
               this.barrioHid=true;
             } 
             else{
               this.cityHid=false;
             }
           },
           error => console.log(error)
     )
   }
   setBarrio(barrioId:number){
    this.barrio.barrioId=barrioId;
  }
  checkInter(typebuy:string){
    this.resetSucursal();
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
        this.checke=false;
        break;
      case "sendHome":
        this.branch= true;
        this.sendHome=false;
        this.shipping.typeShipping="branchHome";
        break;
      default:

    }
  }
  popupHide(){
    this.popupUbication1=true;
    //this.hiddenHomeButton=true;
    //this.ngOnInit();
  }
  ubicacion(){
    this.popupUbication1=false;
  }
  consultarUbi(){
    this.popupSendHome=true;
    console.log("this.userName: "+this.userName);
    this.sellService.ConsultarUbicavionUser(this.userName).subscribe(
      res => {
        console.log("res: "+JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.hiddenHomeButton=true; 
            console.log("ubicacion : "+JSON.stringify(this.ubication));
            this.popupSendHome=false;
            this.popup_g=false;
            this.popupSucursal=true;
            this.popupSucursalHome=true;
            this.getItem("Producto",this.Item.itemId);
            this.quoteS.respuesta="";
            this.userTemp=this.Item.user; 
            this.Item.user=null;
            this.userTemp2.username=this.userTemp.username;
            this.Item.user=this.userTemp2;
            this.quoteS.yng_Item=this.Item;
            this.useri=JSON.parse(localStorage.getItem("user"));
            this.postalCode=this.ubication.postalCode;
            this.useri.yng_Ubication.postalCode=this.postalCode;
            this.useri.yng_Ubication.street=this.ubication.street;
            this.useri.yng_Ubication.number=this.ubication.number;
            this.useri.yng_Ubication.withinStreets=this.ubication.withinStreets;
            this.quoteS.yng_User=this.useri;
            this.quoteS.quantity=this.quantity;
            console.log("da:"+this.shipping.typeShipping);
            if( this.shipping.typeShipping=="branchHome"){
              this.sendQuoteBranchHome(this.quoteS);
            }
            else{
              this.popup_g=true;
            }
            this.hiddenSwOtherHome=false;
        }
        else {
          this.hiddenHomeButton=false;
          this.hiddenSwOtherHome=true;
          console.log("vacio");
                }
          },
          error => {
            console.log("error : " +error); 
            alert("Algo salio mal intente mas tarde");}
    );
    
  }
  envioCompradorHome(event,yng_Quote:Quote){
      
    this.shipping.typeShipping="branchHome";
    this.camSW=true;
    if(event.target.checked==true) {
      this.priceHiddem=false;
      this.shipping.yng_Quote=yng_Quote;
     // this.priceSuc2=""+yng_Quote.rate;
      if(this.Product.productPagoEnvio=="gratis") this.priceSuc=" Envio Gratis";
    else  this.priceSuc=yng_Quote.rate+"  Costo del envio";
    }
  }
  consultarUbiHome(){
    this.popupSendHome=true;
    console.log("this.userName: "+this.userName);
    this.sellService.ConsultarUbicavionUser(this.userName).subscribe(
      res => {
        console.log("res: "+JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.hiddenHomeButton=true; 
           console.log("ubicacion : "+JSON.stringify(this.ubication));
           this.popupSendHome=false;
           this.popup_g=false;
           this.popupSucursal=true;
           this.popupSucursalHome=true;
           this.getItem("Producto",this.Item.itemId);
           this.quoteS.respuesta="";
           this.userTemp=this.Item.user; 
           this.Item.user=null;
           this.userTemp2.username=this.userTemp.username;
           this.Item.user=this.userTemp2;
           this.quoteS.yng_Item=this.Item;
           this.useri=JSON.parse(localStorage.getItem("user"));
           this.postalCode=this.ubication.postalCode;
           this.useri.yng_Ubication.postalCode=this.postalCode;
           this.quoteS.yng_User=this.useri;
           this.quoteS.quantity=this.quantity;
           this.sendQuote(this.quoteS);
        }
        else {
          this.hiddenHomeButton=false;
         /* this.popupEnvios=true;
          this.popupUbicacion=false;*/
          console.log("vacio");
                }
          },
          error => {
            console.log("error : " +error); 
            alert("Algo salio mal intente mas tarde");}
    );
    
  }
  sendQuoteBranchHome(yng_Quote:Quote){
    console.log("yng_Quote: "+JSON.stringify(yng_Quote));
    this.itemDetailService.sendQuoteBranchHome(yng_Quote).subscribe(
      res => {
          this.quoteList=JSON.parse(JSON.parse(JSON.stringify(res))._body);
          console.log("JSON qoute responce:"+JSON.stringify(this.quoteList));

          if(this.quoteList.length>0){
            console.log("yng_Branch:"+JSON.parse(JSON.stringify(this.quoteList[0])).yng_Branch);
            console.log("respuesta"+JSON.parse(JSON.stringify(this.quoteList[0])).respuesta);
            var branchRes=JSON.parse(JSON.stringify(this.quoteList[0])).yng_Branch;
            if (branchRes!=null){
              this.popupCotizar=false;
              this.mostrarCotizacion();
            }
            else{
              this.popup_g=true;
              this.quoteList=null;
              alert("No existe una sucursal cercana");
            }
          }
          else {
            this.popup_g=true;
            this.popupCotizar=true; 
            alert("Código postal invalido");
          }
        },
      error => console.log(error)
    ); 
  }
  getDniCuit(type : string){
    console.log("type:"+type);
    if(type=="2"){
      this.documentType="CUIT";
      this.maxDocumentNumber=13
      this.documentNumber="";
    }
    else{this.documentType="DNI";
    this.maxDocumentNumber=8;
    this.documentNumber="";
   }
  }
  swSendHome:boolean=false;
  swSendOtherHome:boolean=false;
  hiddenSwOtherHome:boolean=true;
  newUbication(){
    this.swSendHome=true;
    this.swSendOtherHome=true;
    this.popupUbication1=false;
    this.useri=JSON.parse(localStorage.getItem("user"));
    console.log("proyecto 1"+JSON.stringify(this.useri));
  }
  personC:Person=new Person();
  ubicationLabel:string;
  isBussines(){
    console.log("this.userName:"+this.userName);
    this.sellService.CosultarIsBussines(this.userName).subscribe(
      res => {
        this.personC = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        console.log("this.personC.business: "+this.personC.business+"this.person: "+JSON.stringify(this.personC));
        if(this.personC.business==true){
          this.ubicationLabel="INGRESA LA DIRECCIÓN DE LA CASA CENTRAL DE LA EMPRESA";
        }
        else {
          this.ubicationLabel="INGRESA ESTOS DATOS POR ÚNICA VEZ";
        }
          },
          error => console.log(error)
    );    
  }
  changeDocumentNumber(event: any) {
    this.documentNumber=this.documentNumber.replace(".","");
    if(this.documentNumber.length>=2&&this.documentNumber.length<=5){
      this.documentNumber=this.documentNumber.replace(".","");
      this.documentNumber = this.documentNumber.substring(0, 2)+"."+this.documentNumber.substring(2, this.documentNumber.length);
    }
    if(this.documentNumber.length>5){
      this.documentNumber=this.documentNumber.replace(".","");
      this.documentNumber = this.documentNumber.substring(0, 2)+"."+this.documentNumber.substring(2, 5)+"."+this.documentNumber.substring(5, this.documentNumber.length);
    }
    //this.documentNumber = this.documentNumber.substring(0, 2)+"-"+this.documentNumber.substring(2, 10)+"-"+this.documentNumber.substring(10, 11);
  }
}
