import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../service/item-detail.service';
import { Item } from '../../model/item';
import { PaymentMethod } from '../../model/payment-method';  
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  public itemId: number;
  public quantity: number;
  public Item:Item=new Item();
  public cost:number;
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
            console.log(JSON.stringify(this.Item));     
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
    console.log(JSON.stringify(this.paymentMethod));
  }
  showProblem(ev){
    if(ev="problemCard"){
      alert("Ocurrio un problema con el pago. Revise los datos de la tarjeta");
      this.hidShip=true;
      this.hidPay=false;
      this.hidConf=true;
    }
  }

}
