import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../service/item-detail.service';
import { Item } from '../../model/item';
import { PaymentMethod } from '../../model/payment-method';  
import { Cotizacion } from '../../model/cotizacion';
import { AndreaniEnvios } from '../../model/andreaniEnvios';
import { AndreaniSucursalRespuesta } from '../../model/andreaniSucursalRespuesta';
import { Shipping } from '../../model/shipping';
import { Product } from '../../model/product';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  public itemId: number;
  public quantity: number;
  public Item:Item=new Item();
  public cotizacion:Cotizacion=new Cotizacion();
  public envio:AndreaniEnvios=new  AndreaniEnvios();
  public shipping:Shipping=new Shipping();
  public sucursal:AndreaniSucursalRespuesta=new AndreaniSucursalRespuesta();
  public cost:number;
  public product:Product =new Product();
  public priceSuc:string;
  hidShip:boolean;
  hidPay:boolean;
  hidConf:boolean;
  public paymentMethod:PaymentMethod= new PaymentMethod();
 
    constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService) { 
    this.itemId =route.snapshot.params['itemId'];
    this.quantity = route.snapshot.params['quantity'];
  }
  ngOnInit() {
    this.getItemById();
    this.hidShip=false;
    this.hidPay=true;
    this.hidConf=true;
  }
  getItemById(){
    this.itemDetailService.getItemById(this.itemId).subscribe(
			res => {
            this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            //console.log(JSON.stringify(this.Item));     
            this.cost=this.Item.price*this.quantity;
      		},
      		error => console.log(error)
    );
  }
  sendTypeShip(ev){
    if(ev==""){
      this.hidShip=false;
      this.hidPay=true;
      this.hidConf=true;
    }else{
      this.hidShip=true;
      this.hidPay=false;
      this.hidConf=true;
    }

  }
  sendTypePay(ev){
    if(ev==""){
      this.hidShip=true;
      this.hidPay=false;
      this.hidConf=true;
    }else{
      this.hidShip=true;
      this.hidPay=true;
      this.hidConf=false;
    }
    this.paymentMethod=ev;
    //alert(JSON.stringify(this.paymentMethod));
  //  console.log(JSON.stringify(this.paymentMethod));
  }
  sendTypeEnvio(ev){
    if(ev==""){
     // alert("ERROR");
    }
    else{
      
    }

    this.shipping=ev;
    //console.log(JSON.stringify(this.envio));

  }
  sendTypeCotizacion(ev)
  {
    if(ev==null){
     //alert("Error");
    }
    this.cotizacion=ev;
  }
  

  sucursalRe:string;
  sendSucursal(ev){
    
    if(ev=""){
      //this.sucursalRe="Retiro en domicilio del vendedor ";
    }
    else{

      //this.sucursalRe=this.sucursal.descripcion+" "+this.sucursal.direccion+" "+this.sucursal.horadeTrabajo;
    }
    this.sucursal=ev;
   // console.log("Sucursal: "+JSON.stringify(this.sucursal));

  }
  sendProduct(ev){
    this.product=ev;
    console.log("product: "+JSON.stringify(this.product));


  }
  sendTypePrice(ev){
    this.priceSuc=ev;

  }

}
