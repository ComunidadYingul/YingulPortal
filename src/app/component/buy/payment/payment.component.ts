import { Injectable, ElementRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { Item } from '../../../model/item';
import { BuyService } from '../../../service/buy.service'
import { ListCreditCard } from '../../../model/list-credit-card';
import { CardProvider } from '../../../model/card-provider';
import { Card } from '../../../model/card';
import { Payment } from '../../../model/payment';  
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import {Pipe} from '@angular/core';
import { AndreaniSucursalRespuesta } from '../../../model/andreaniSucursalRespuesta';
import { AndreaniEnvios } from '../../../model/andreaniEnvios';
import { Network } from '../../../model/Network';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  @Input('quantity') quantity:number;
  @Input('priceSuc') priceSuc:string;
  @Input('Item') Item:Item;
  @Input('andreaniEnvio')andreaniEnvio:AndreaniEnvios=new AndreaniEnvios;
  @Output() typePay = new EventEmitter();
  providerHid:boolean=true;
  formHid:boolean=true;
  msgHid:boolean=true;
  debitHid:boolean=true;
  creditCardList:ListCreditCard[];
  cardProviderList:CardProvider[];
  fechaActual = new Date();
  anio = this.fechaActual.getFullYear();
  anios = [];
  countObservable = Observable.range(this.anio, 41).toArray();
  card:Card= new Card();
  cardUser:Card[];
  //datos recuperados del formulario
  cardNumber:string="";
  fullName:string;
  cvv:number;
  dueMonth:string="0";
  dueYear:string="0";
  dni:number;
  provider:number=-1;
  paymentMethod:string="null";
  focusedr:boolean;
  focusedf:boolean=true;
 // priceSuc:string;
  //fin datos recuperados del formulario
  User: user=new user();
  payment:Payment= new Payment();

  /*****************************************************/
  hidPaymentMethod:boolean=true;
  hidProvider:boolean=true;
  hidCardNumber:boolean=true;
  hidFullname:boolean=true;
  hidCvv:boolean=true;
  hidDueMonth:boolean=true;
  hidDueYear:boolean=true;
  hidDni:boolean=true;

  constructor(private buyService: BuyService, private router: Router) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
  }

  ngOnInit() {
    //para obtener 40 años de la fecha de expiracion de las tarjetas 
    
    for (let i = 0; i < 41; i++) {
        this.anios.push(this.anio+i);
      }
    //fin
    this.buyService.getListCreditCard().subscribe(
			res => {
            this.creditCardList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );

    this.buyService.getCardForUser(this.User.username).subscribe(
			res => {
            this.cardUser = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            //console.log(JSON.stringify(this.cardUser));
      		},
      		error => console.log(error)
    );
  }
  getProvider(listcardId:string){
    if(listcardId!="null"){
      this.debitHid=true;
      this.providerHid=true;
      this.msgHid=true;
      if(listcardId=="VisaD"||listcardId=="CabalD"||listcardId=="MastercardD"||listcardId=="MaestroD")
      {
        this.debitHid=false;
        this.payment.name="CARDPAYMENT";
        this.payment.type="CARD";
        this.payment.yng_Card.type="DEBIT";
        switch (listcardId){
          case "VisaD":
            this.payment.yng_Card.provider="VISA";
          break;
          case "CabalD":
            this.payment.yng_Card.provider="CABAL";
          break;
          case "MastercardD":
            this.payment.yng_Card.provider="MASTERCARD";
          break;
          case "MaestroD":
            this.payment.yng_Card.provider="MAESTRO";
          break;
        }
      }
      else{
        if(listcardId=="Rapipago"||listcardId=="PagoFacil"||listcardId=="ProvinciaNET"){
          this.msgHid=false;
        }
        else{
          this.buyService.getCardProvider(listcardId).subscribe(
            res => {
                  this.cardProviderList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                  for(let i of this.creditCardList){
                    if(i.listCreditCardId==+listcardId){
                      this.payment.yng_Card.provider=i.keyPayu;
                    }
                  }
                  if(JSON.stringify(this.cardProviderList)=="[]"){
                    this.providerHid=true;
                    this.debitHid=false;
                    this.payment.yng_Card.type="CREDIT";
                    /* en caso de que no existan proveedores para el tipo de tarjeta proporcionado this.payment.yng_Card.yng_CardProvider=*/
                  } 
                  else{
                    this.providerHid=false;
                  }
                },
                error => console.log(error)
          );
        }
      }
    }
    this.paymentMethod=listcardId;
  }
  setProvider(cardProviderId:number){
    this.debitHid=false;
    this.payment.yng_Card.type="CREDIT";
    this.payment.yng_Card.yng_CardProvider.cardProviderId=cardProviderId;
    this.provider=cardProviderId;
  }
  /*check(a:number){   
    esto es para la s cuotas con tarjeta de credito
  }*/
  sendTypePay(){
    if(this.validarTypePay()){
      //datos del fomulario para tarjetas 
      var cadena:string = this.cardNumber;
      var CadenaSinBlancos:string="";
      for (var x=0; x< cadena.length; x++)
      {
        if (cadena.charAt(x) != ' ')
        {
        CadenaSinBlancos += cadena.charAt(x); 
        }
      }
      this.payment.yng_Card.number=parseFloat(CadenaSinBlancos);
      this.payment.yng_Card.fullName=this.fullName;
      this.payment.yng_Card.securityCode=this.cvv;
      this.payment.yng_Card.dueMonth=+this.dueMonth;
      this.payment.yng_Card.dueYear=+this.dueYear;
      this.payment.yng_Card.dni=this.dni;
      //fin de datos del formulario para tarjetas
      this.payment.yng_Card.user=JSON.parse(localStorage.getItem("user"));
      this.typePay.emit(this.payment);
      console.log(JSON.stringify(this.payment));
    }
  }

  validarTypePay(){
    this.resetHidTypePay();
    if(this.paymentMethod=="null"){
      this.hidPaymentMethod=false;
      return false;
    }else if(this.providerHid==false && this.provider==-1){
      this.hidProvider=false;
      return false;
    }else if(this.cardNumber==null || this.cardNumber.length<19){
      this.hidCardNumber=false;
    }else if(this.fullName==null || this.fullName==""){
      this.hidFullname=false;
    }else if(this.cvv==null || this.cvv.toString()==""){
      this.hidCvv=false;
    }else if(+this.dueMonth==0 || +this.dueMonth==null){
      this.hidDueMonth=false;
    }else if(+this.dueYear==0 || +this.dueYear==null){
      this.hidDueYear=false;
    }else if(this.dni==0 || this.dni==null){
      this.hidDni=false;
    }
    else{
      return true;
    }
  }

  resetHidTypePay(){
    this.hidPaymentMethod=true;
    this.hidProvider=true;
    this.hidCardNumber=true;
    this.hidFullname=true;
    this.hidCvv=true;
    this.hidDueMonth=true;
    this.hidDueYear=true;
    this.hidDni=true;
  }

  cardSelected(card:Card){
    this.payment.name="CARDPAYMENT";
    this.payment.type="CARD";
    this.payment.yng_Card=card;
    this.payment.yng_Card.user=JSON.parse(localStorage.getItem("user"));
    this.typePay.emit(this.payment);
    console.log(JSON.stringify(this.payment));
  }

  onFocusCVV(){
    this.focusedr=true;
  }
  onBlurCVV(){
    this.focusedr=false;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumTarjeta(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if(this.cardNumber.length>0 && (this.cardNumber.length==4 || this.cardNumber.length==9 || this.cardNumber.length==14)){
      this.cardNumber+=" ";
    }
  }
}
