import { Injectable, ElementRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { Item } from '../../../model/item';
import { BuyService } from '../../../service/buy.service'
import { ListCreditCard } from '../../../model/list-credit-card';
import { Card } from '../../../model/card';
import { Payment } from '../../../model/payment';  
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import {Pipe} from '@angular/core';
import { AndreaniSucursalRespuesta } from '../../../model/andreaniSucursalRespuesta';
import { AndreaniEnvios } from '../../../model/andreaniEnvios';
import { Network } from '../../../model/Network';
import { CashPayment } from '../../../model/cash-payment';
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
  formHid:boolean=true;
  msgHid:boolean=true;
  debitHid:boolean=true;
  creditCardList:ListCreditCard[];
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
  dni:string;
  paymentMethod:string="null";
  focusedr:boolean;
  focusedf:boolean=true;
 // priceSuc:string;
  //fin datos recuperados del formulario
  User: user=new user();
  payment:Payment= new Payment();
  documentType:string="DNI";
  documentNumber:string;
  cashPayment:CashPayment=new CashPayment();
  /*****************************************************/
  hidPaymentMethod:boolean=true;
  hidCardNumber:boolean=true;
  hidFullname:boolean=true;
  hidCvv:boolean=true;
  hidDueMonth:boolean=true;
  hidDueYear:boolean=true;
  hidDni:boolean=true;

  constructor(private elem:ElementRef,private buyService: BuyService, private router: Router) { 
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
      this.msgHid=true;
      if(listcardId=="VisaD"||listcardId=="CabalD"||listcardId=="MastercardD"||listcardId=="MaestroD")
      {
        this.payment.cashPayment=null;
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
        if(listcardId=="COBRO_EXPRESS"||listcardId=="PAGOFACIL"||listcardId=="ProvinciaNET"||listcardId=="RAPIPAGO"||listcardId=="RIPSA"){
          this.msgHid=false;
          this.payment.name="CASHPAYMENT";
          this.payment.type="CASH";
          this.payment.yng_Card=null;
          this.cashPayment.paymentMethod=listcardId;
          this.payment.cashPayment=this.cashPayment;
        }
        else{
          this.payment.cashPayment=null;
          this.payment.name="CARDPAYMENT";
          this.payment.type="CARD";
          this.payment.yng_Card.type="CREDIT";
          switch(listcardId){
            case "0":
              this.payment.yng_Card.provider="VISA";
              break;
            case "1":
              this.payment.yng_Card.provider="MASTERCARD";
              break;
            case "2":
              this.payment.yng_Card.provider="AMEX";
              break;
            case "3":
              this.payment.yng_Card.provider="SHOPPING";
              break;
            case "4":
              this.payment.yng_Card.provider="CABAL";
              break;
            case "5":
              this.payment.yng_Card.provider="DINERS";
              break;
            case "6":
              this.payment.yng_Card.provider="ARGENCARD";
              break;
            case "7":
              this.payment.yng_Card.provider="NARANJA";
              break;
            case "8":
              this.payment.yng_Card.provider="CENCOSUD";
              break;
          }
          this.debitHid=false;
        }
      }
    }
    this.paymentMethod=listcardId;
  }
  /*check(a:number){   
    esto es para la s cuotas con tarjeta de credito
  }*/
  sendTypePay(){
    //if(this.validarTypePay()){
        if(this.payment.type=="CASH"){
          this.payment.cashPayment.documentNumber=this.documentNumber;
          this.payment.cashPayment.documentType=this.documentType;
        }else{
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
          this.payment.yng_Card.dni= +this.dni;
          //fin de datos del formulario para tarjetas
          this.payment.yng_Card.user=JSON.parse(localStorage.getItem("user"));
        }
        this.typePay.emit(this.payment);
        console.log(JSON.stringify(this.payment));
    //}
  }

  validarTypePay(){
    this.resetHidTypePay();
    if(this.paymentMethod=="null"){
      this.hidPaymentMethod=false;
      this.elem.nativeElement.querySelector('#paymentMethod').focus();
      return false;
    }else if(this.cardNumber==null || this.cardNumber.length<16){
      this.hidCardNumber=false;
      this.elem.nativeElement.querySelector('#cardNumber').focus();
      return false;
    }else if(this.fullName==null || this.fullName==""){
      this.hidFullname=false;
      this.elem.nativeElement.querySelector('#fullName').focus();
      return false;
    }else if(this.cvv==null || this.cvv.toString()==""){
      this.hidCvv=false;
      this.elem.nativeElement.querySelector('#cvv').focus();
      return false;
    }else if(+this.dueMonth==0 || +this.dueMonth==null){
      this.hidDueMonth=false;
      this.elem.nativeElement.querySelector('#dueMonth').focus();
      return false;
    }else if(+this.dueYear==0 || +this.dueYear==null){
      this.hidDueYear=false;
      this.elem.nativeElement.querySelector('#dueYear').focus();
      return false;
    }else if(this.dni=="" || this.dni==null){
      this.hidDni=false;
      this.elem.nativeElement.querySelector('#dni').focus();
      return false;
    }
    else{
      return true;
    }
  }

  resetHidTypePay(){
    this.hidPaymentMethod=true;
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
    /*if(this.cardNumber.length>0 && (this.cardNumber.length==4 || this.cardNumber.length==9 || this.cardNumber.length==14)){
      this.cardNumber+=" ";
    }*/
  }
  changeDniNumber(event: any) {
    this.dni=this.dni.replace(".","");
    if(this.dni.length>=2&&this.dni.length<=5){
      this.dni=this.dni.replace(".","");
      this.dni = this.dni.substring(0, 2)+"."+this.dni.substring(2, this.dni.length);
    }
    if(this.dni.length>5){
      this.dni=this.dni.replace(".","");
      this.dni = this.dni.substring(0, 2)+"."+this.dni.substring(2, 5)+"."+this.dni.substring(5, this.dni.length);
    }
    //this.documentNumber = this.documentNumber.substring(0, 2)+"-"+this.documentNumber.substring(2, 10)+"-"+this.documentNumber.substring(10, 11);
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
