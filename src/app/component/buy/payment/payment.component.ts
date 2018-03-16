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
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
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
  cardNumber:number;
  fullName:string;
  cvv:number;
  dueMonth:number;
  dueYear:number;
  dni:number;
  provider:string="null";
  focusedr:boolean;
  focusedf:boolean=true;
 // priceSuc:string;
  //fin datos recuperados del formulario
  User: user=new user();
  payment:Payment= new Payment();
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
  }
  setProvider(cardProviderId:number){
    this.debitHid=false;
    this.payment.yng_Card.type="CREDIT";
    this.payment.yng_Card.yng_CardProvider.cardProviderId=cardProviderId;
  }
  /*check(a:number){   
    esto es para la s cuotas con tarjeta de credito
  }*/
  sendTypePay(){
    //datos del fomulario para tarjetas 
    var cadena:string = this.cardNumber.toString()
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
    this.payment.yng_Card.dueMonth=this.dueMonth;
    this.payment.yng_Card.dueYear=this.dueYear;
    this.payment.yng_Card.dni=this.dni;
    //fin de datos del formulario para tarjetas
    this.payment.yng_Card.user=JSON.parse(localStorage.getItem("user"));
    this.typePay.emit(this.payment);
    console.log(JSON.stringify(this.payment));
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
}
