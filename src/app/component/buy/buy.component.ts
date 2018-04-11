import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailService } from '../../service/item-detail.service';
import { Item } from '../../model/item';
import { Payment } from '../../model/payment';  
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
  public postalCode: number;
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
  public payment:Payment= new Payment();
 
  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService,private router: Router) { 
    this.itemId =route.snapshot.params['itemId'];
    this.quantity = route.snapshot.params['quantity'];
    this.postalCode=route.snapshot.params['postalCode'];
    console.log("this.postalCode:"+this.postalCode+" quant:"+this.quantity);
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
            if(this.Item.type=="Service"||this.Item.type=="Property"){
              this.router.navigate(['/itemDetail/'+this.itemId]);
            }
            //console.log(JSON.stringify(this.Item));  
            if(this.Item.type=="Motorized"){
              this.cost=1500;
              this.quantity=1;
            }   
            if(this.Item.type=="Product"){
              this.cost=this.Item.price*this.quantity;
            }
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
    this.payment=ev;

  }
  sendTypeEnvio(ev){
    this.shipping=ev;
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
  showProblem(ev){
    if(ev="problemCard"){
      alert("Ocurrio un problema con el pago. Revise sus fondos o los datos de la tarjeta");
      this.hidShip=true;
      this.hidPay=false;
      this.hidConf=true;
    }
  }
  sendShipping(ev){
    this.shipping=ev;
  }
  shiping(){
    this.ngOnInit();
  }
  pays(){
    if(this.shipping.typeShipping==""||this.shipping.typeShipping==null){
      this.hidShip=false;
      this.hidPay=true;
      this.hidConf=true;
    }else{
      this.hidShip=true;
      this.hidPay=false;
      this.hidConf=true;
    }
  }
  confirm(){
    if(this.shipping.typeShipping==""||this.shipping.typeShipping==null){
      this.hidShip=false;
      this.hidPay=true;
      this.hidConf=true;
    }else{
      if(this.payment.yng_Card.type==""||this.payment.yng_Card.type==null){
        this.hidShip=true;
        this.hidPay=false;
        this.hidConf=true;
      }else{
        this.hidShip=true;
        this.hidPay=true;
        this.hidConf=false;
      }
    }
  }
  modifyAction(ev){
    if(ev=="payment"){
      this.pays();
    }
    if(ev=="shipping"){
      this.ngOnInit();
    }
  }
}
