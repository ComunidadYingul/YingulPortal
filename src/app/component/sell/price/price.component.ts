import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SellService } from '../../../service/sell.service'
import { Service } from '../../../model/service';
import { Province } from '../../../model/province';
import { City } from '../../../model/city';
import { Barrio } from '../../../model/barrio';
import { user } from '../../../model/user';

import { Product } from '../../../model/product';
import { Property } from '../../../model/Property';
import { Motorized } from '../../../model/Motorized';
import { Ubication } from '../../../model/ubication';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  @Output() Back = new EventEmitter();
  @Output() priceItemS = new EventEmitter();

  @Input()  typeCatPre:any;
  provinceList: Object[];
  cityList: Object[];
  barrioList : Object[];
  cityHid:boolean;
  barrioHid:boolean;
  //datos del formulario
  phone:string="";
  phone2:string="";
  email:string="";
  webSite:string="";
  price:number;
  money:string="";
  public cobertureZone:Object[]=[];
  street:string="";
  number:string="";
  postalCode:string="";
  aditional:string="";
  User:object;
  userName;
  ubicationId:string;
  //objeto final para enviar
  public service:Service = new Service();
  public product:Product = new Product();
  public property:Property = new Property();
  public motorized:Motorized =new Motorized();


  //
  public province:Province = new Province();
  public city:City = new City();
  public barrio:Barrio = new Barrio();
  checkRPerson:boolean=false;
  disabledRPerson:boolean=false;
  public popupDescuento:boolean=true;
  checkedDiscount:boolean=false;
  priceDiscount:number;
  priceNormal:number;
  constructor(private sellService: SellService) { 
    this.cityHid=true;
    this.barrioHid=true;
  }

  ngOnInit() {
    this.sellService.getProvinces().subscribe(
			res => {
        		this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
    this.sellService.getUser().subscribe(
      res => {
        this.User = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        this.phone=JSON.stringify(JSON.parse(JSON.stringify(this.User)).phone);
        this.phone=this.phone.replace(/['"]+/g, '');
        if(this.phone=="null"){this.phone="";}
        this.phone2=JSON.stringify(JSON.parse(JSON.stringify(this.User)).phone2);
        this.phone2=this.phone2.replace(/['"]+/g, '');
        if(this.phone2=="null"){this.phone2="";}
        this.webSite=JSON.stringify(JSON.parse(JSON.stringify(this.User)).webSite);
        this.webSite=this.webSite.replace(/['"]+/g, '');
        if(this.webSite=="null"){this.webSite="";}
        this.userName=JSON.stringify(JSON.parse(JSON.stringify(this.User)).username);
        this.userName=this.userName.replace(/['"]+/g,'');
        //his.ubicationId=JSON.stringify(JSON.parse(JSON.stringify(this.User)).yng_Ubication.);
       // this.ubicationId=this.ubicationId.replace(/['"]+/g,'');
       // alert("userNameprice :"+this.ubicationId);


      },
      error => console.log(error)
    )
    
  }
  provin:string;
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
  getBarrio(cityId : number){
    this.city.cityId=cityId;
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
  setBarrio(barrioId:number){
    this.barrio.$barrioId=barrioId;
  }
  zonaServ():boolean{
    if(this.typeCatPre=="Service")      return true;
    else                                return false;
  }
  isProduct():boolean{
    if(this.typeCatPre=="Product")      return true;
    else                                return false;
  }
  isOtro():boolean{
    if(this.typeCatPre!="Product")      return true;
    else                                return false;
  }
  

  sendPrice(){
    console.log("type price  pre: "+this.typeCatPre)
    if(this.typeCatPre=="Service"){
    
        this.service.$yng_Item.$user.$phone=this.phone;
        this.service.$yng_Item.$user.$phone2=this.phone2;
        this.service.$emailService=this.email;
        this.service.$yng_Item.$user.$webSite=this.webSite;
        this.service.$yng_Item.$price=this.price;
        this.service.$yng_Item.$money=this.money;
        this.service.$yng_Item.$yng_Ubication.$street=this.street;
        this.service.$yng_Item.$yng_Ubication.$number=this.number;
        this.service.$yng_Item.$yng_Ubication.$postalCode= this.postalCode;
        this.service.$yng_Item.$yng_Ubication.$aditional=this.aditional;
        this.service.$yng_Item.$yng_Ubication.$yng_Province=this.province;
        this.service.$yng_Item.$yng_Ubication.$yng_City=this.city;
        this.service.$yng_Item.$yng_Ubication.$yng_Barrio=this.barrio;
        this.service.$cobertureZone=this.cobertureZone;
        this.priceItemS.emit(this.service);
    }
    if(this.typeCatPre=="Product")
    {
      this.product.yng_Item.$user.$phone=this.phone;
      this.product.yng_Item.$user.$phone2=this.phone2;
      //this.product.$emailService=this.email;
      this.product.yng_Item.$user.$webSite=this.webSite;
      this.product.yng_Item.$price=this.price;
      this.product.yng_Item.$money="1";      
      //this.product.
      //this.product.$cobertureZone=this.cobertureZone;
      this.product.productPaymentMethod=this.productPaymentMethod;
      this.product.productSaleConditions=this.productSaleConditions;
      
      //this.product.$productFormDelivery=
      this.priceItemS.emit(this.product);

    }
    if(this.typeCatPre=="Property"){
      this.property.$yng_Item.$user.$phone=this.phone;
      this.property.$yng_Item.$user.$phone2=this.phone2;
      //this.product.$emailService=this.email;
      this.property.$yng_Item.$user.$webSite=this.webSite;
      this.property.$yng_Item.$price=this.price;
      this.property.$yng_Item.$money=this.money;
      this.property.$yng_Item.$yng_Ubication.$street=this.street;
      this.property.$yng_Item.$yng_Ubication.$number=this.number;
      this.property.$yng_Item.$yng_Ubication.$postalCode= this.postalCode;
      this.property.$yng_Item.$yng_Ubication.$aditional=this.aditional;
      this.property.$yng_Item.$yng_Ubication.$yng_Province=this.province;
      this.property.$yng_Item.$yng_Ubication.$yng_City=this.city;
      this.property.$yng_Item.$yng_Ubication.$yng_Barrio=this.barrio;
      //this.product.$cobertureZone=this.cobertureZone;
      this.priceItemS.emit(this.property);
    }
    if(this.typeCatPre=="Motorized")
    {
      this.motorized.$yng_Item.$user.$phone=this.phone;
      this.motorized.$yng_Item.$user.$phone2=this.phone2;
      //this.product.$emailService=this.email;
      this.motorized.$yng_Item.$user.$webSite=this.webSite;
      this.motorized.$yng_Item.$price=this.price;
      this.motorized.$yng_Item.$money=this.money;
      this.motorized.$yng_Item.$yng_Ubication.$street=this.street;
      this.motorized.$yng_Item.$yng_Ubication.$number=this.number;
      this.motorized.$yng_Item.$yng_Ubication.$postalCode= this.postalCode;
      this.motorized.$yng_Item.$yng_Ubication.$aditional=this.aditional;
      this.motorized.$yng_Item.$yng_Ubication.$yng_Province=this.province;
      this.motorized.$yng_Item.$yng_Ubication.$yng_City=this.city;
      this.motorized.$yng_Item.$yng_Ubication.$yng_Barrio=this.barrio;
      //this.product.$cobertureZone=this.cobertureZone;
      this.priceItemS.emit(this.motorized);

    }
  }
  back(){
    this.Back.emit('back');
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
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressCP(event: any){
    const pattern = /[0-9]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
  }
  codigoPostalE:string;
  btnCP:boolean=false;
  provinciaCP:string;
  provinciaID:number;
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
  popupUbication:boolean=true;
  aceptar(){
    
   
    if(this.street==""||this.number==""||this.aditional==""){  
      alert("Complete todo los datos por favor");
    }
    else{
      this.product.yng_Item.$yng_Ubication.$street=this.street;
      this.product.yng_Item.$yng_Ubication.$number=this.number;
      this.product.yng_Item.$yng_Ubication.$postalCode= this.postalCode;
      this.product.yng_Item.$yng_Ubication.$aditional=this.aditional;
      this.product.yng_Item.$yng_Ubication.$yng_Province=this.province;
      this.product.yng_Item.$yng_Ubication.$yng_City=this.city;
      this.product.yng_Item.$yng_Ubication.$yng_Barrio=this.barrio;
      this.popupEnvios=false;
      this.popupUbicacion=true;
      this.popupUbication=true;
    }  
  }
  ubicacion(){
    this.popupUbication=false;
  }
  cambiarCP(){
    this.cityHid=true;
    this.postalCode="";
    this.number="";
    this.street="";
    this.aditional="";
    this.btnCP=false;
  }

  popup:boolean=true;
 popupEligeDomicilio:boolean=true;
 popupEnvios:boolean=true;
 popupGarantia:boolean=true;
 popupCotizar:boolean=true;
 popupUbicacion:boolean=true;
 ubication:Ubication;

  test(event) {  
    console.log("event:"+event.target.checked);    
    if(event.target.checked==true){
      this.product.productFormDelivery="YingulEnvios"      
      this.consultarUbi();
    }
    else {
      this.popupEnvios=true;
      this.popupUbicacion=true;
    }
  }

  test2(event) {  
    console.log("event:"+event.target.checked);    
    if(event.target.checked==true){
      this.product.productFormDelivery="YingulEnviosPersona"      
     // this.consultarUbi();
    }
    else {
      //this.popupEnvios=true;
      //this.popupUbicacion=true;
    }
  }
  consultarUbi(){
    console.log("this.userName"+this.userName);
    this.sellService.ConsultarUbicavionUser(this.userName).subscribe(
      res => {
        //console.log(JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
           
           console.log(JSON.stringify(this.ubication));
          //alert(this.ubication.codAndreani+" "+this.ubication.postalCode);
           this.product.yng_Item.$yng_Ubication=this.ubication;
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
  popGarantia(event) {
  
    console.log("event:"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=false;}
    else this.popupGarantia=true;
    console.log("popupGarantia:"+this.popupGarantia);
  
  }
  envioComprador(event){
  
    if(event.target.checked==true) this.product.productPagoEnvio="comprador";
    if(event.target.checked==true) {
      this.checkRPerson=true;
      this.disabledRPerson=false;
    }
  }
  envioGratis(event){
    
    if(event.target.checked==true) this.product.productPagoEnvio="gratis";
    if(event.target.checked==true) {
      this.checkRPerson=false;
      this.disabledRPerson=true;
    }
  }
  productSaleConditions:string;
  capturarCondicionVenta(provinceId : string){
    this.productSaleConditions=provinceId;
  }
  productPaymentMethod:string;
  pagoMedios(envi:string){
    if(envi=="1")
    this.productPaymentMethod="Aceptar pagos solo por Yingul";
    if(envi=="2")
    this.productPaymentMethod="Aceptar pagos por Yingul y cobro en persona";
  
  }

  discountPrice(event){
    if(event.target.checked==true){
      this.popupDescuento=false;
    }
    else {
      
    }

  }
  aceptarDiscount(){
    if(this.priceNormal>this.priceDiscount){
    this.popupDescuento=true;
    this.checkedDiscount=false;
    this.product.yng_Item.priceDiscount=this.priceDiscount;
    this.product.yng_Item.priceNormal=this.priceNormal;
    this.price=this.priceDiscount;
    //this.
    }
    else{
      alert("Los valores no son válidos");
    }
  }
}
