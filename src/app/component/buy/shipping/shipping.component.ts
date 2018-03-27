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
  phone:string="";
  shippingMethod;
  branch:boolean=true;
  sendHome:boolean=true;
  priceSuc:string="";
  popupSucursal:boolean=true;
  checke:boolean=false;
 
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
  constructor(private buyService: BuyService,private route:ActivatedRoute,private itemDetailService : ItemDetailService,private sellService: SellService,private router: Router) { 
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
           
          //alert(this.ubication.codAndreani+" "+this.ubication.postalCode);
           //this.product.yng_Item.yng_Ubication=this.ubication;
            //this.popupEnvios=false;
           this.popupUbication=true;
        }
        else {
          //this.popupEnvios=true;
          this.popupUbication=false;
          this.countryAll();
        }
          },
          error => console.log(error)
    );
    
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
        this.checke=false;
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
    if(this.name==""||this.phone=="" ||this.camSW==false){alert("Complete o seleccione otra opción de envío")}
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
    
    //this.shipping.yng_envio=this.andreaniEnvio;
    //this.shipping.typeShipping=this.branchS.nameMail;
    this.shipping.yng_Quote.yng_Branch=this.branchS;
    this.shipping.yng_Quote
    this.shipping.yng_Shipment
    this.typeEnvio.emit(this.shipping);
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
    //buscarCP:string="";
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
                 // this.camSW=true;
              
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
      else  this.priceSuc=this.priceSuc2+"  Costo del envio";
      /*this.cotizacion.categoriaDistancia=this.andreaniCotizacionRespuesta.categoriaDistancia
      this.cotizacion.categoriaDistanciaId=this.andreaniCotizacionRespuesta.categoriaDistanciaId;
      this.cotizacion.categoriaPeso=this.andreaniCotizacionRespuesta.categoriaPeso;
      this.cotizacion.categoriaPesoId=this.andreaniCotizacionRespuesta.categoriaPesoId;
      this.cotizacion.pesoAforado=this.andreaniCotizacionRespuesta.pesoAforado;
      this.cotizacion.tarifa=this.andreaniCotizacionRespuesta.tarifa;*/
      this.popupSucursal=false;
      //alert(this.andreaniCotizacionRespuesta.tarifa);


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
              this.popupCotizar=false;
              //getItemS();
              this.mostrarCotizacion();
              //this.mostrarSucursal();
            }
            else {
              this.popupCotizar=true; 
              alert("Código postal invalido");
            }
          },
        error => console.log(error)
      ); 
    }
    quoteSend(){
      if(this.postalCode!=""){
        this.popupSucursal=true;
        this.getItem("Producto",this.Item.itemId); 
         //this.quoteS.rate=0;
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
      else {
        var codigoPostalSel="";
        
        if(this.postalCode=="")codigoPostalSel=codigoPostalSel+"\n -Un Código postal";
        alert("Para realizar una cotización debe agregar:"+codigoPostalSel);
  
      }
     
    }
    getItemS(itemType:string, itemId: number){
      this.itemDetailService.getItem(itemType,itemId).subscribe(
        res => {
              switch (itemType) {
                case "Producto":
                  this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                 // this.camSW=true;
              
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
    sendTypeShip2(){
      if (this.branch==false){
      if(this.name==""||this.phone=="" ||this.camSW==false){alert("Complete o seleccione otra opción de envío")}
      else{
        if(this.shipping.typeShipping=="branch")
        {
          this.typeCotizacion.emit(this.cotizacion);
          this.typeProduct.emit(this.Product);
          this.typePrice.emit(this.priceSuc);
          this.typeShip.emit("envio");          
          //this.shipping.yng_envio=this.andreaniEnvio;
          //this.shipping.typeShipping=this.branchS.nameMail;
          //this.shipping.yng_Quote.yng_Branch=this.branchS;
          //this.shipping.yng_Quote
         // this.shipping.yng_Shipment
          this.shipping.yng_Quote.yng_Item=null;
          this.shipping.yng_Quote.yng_User=null;
          this.shipping.nameContact=this.name;
          this.shipping.phoneContact=this.phone;
          this.typeEnvio.emit(this.shipping);
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
      
      if(this.street==""||this.number==""||this.aditional==""){  
        alert("Complete todo los datos por favor");
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
        console.log("ubication"+JSON.stringify(this.User));
        this.buyService.updateUserUbication(this.User).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg=='save'){
                  //this.sw=true;
                 // this.buyItem();
                 this.popupUbication=true;
                }
                else{
                  alert(this.msg);
                } 
              },
              error => console.log(error)
        );
    
        this.popup=true;
        this.popupUbication=true;
      }  
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
}
