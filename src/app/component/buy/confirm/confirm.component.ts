import { Component, OnInit, Input } from '@angular/core';
import { PaymentMethod } from '../../../model/payment-method';  
import { Item } from '../../../model/item';
import { Buy } from '../../../model/buy';
import { BuyService } from '../../../service/buy.service'
import { Router } from '@angular/router';
import { user } from '../../../model/user';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input('paymentMethod') paymentMethod:PaymentMethod= new PaymentMethod();
  @Input('quantity') quantity:number;
  @Input('Item') Item:Item;
  @Input('cost') cost:number=12;
  buy:Buy=new Buy();
  msg:string;
  sw:boolean;
  popup:boolean=true;
  phone:string;
  User: user=new user();
  constructor(private buyService: BuyService, private router: Router) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
  }

  ngOnInit() {
    this.buyService.getSwForData(this.User.username).subscribe(
			res => {
            this.sw = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  buyItem(){
    //aqui aumentas el precio del envio
    if(!this.sw){
      this.popup=false;
    } 
    else{
      this.buy.$cost=this.cost;
      this.buy.$quantity=this.quantity;
      this.buy.$yng_item=this.Item;
      this.buy.$yng_item.user=null;
      this.buy.$yng_PaymentMethod=this.paymentMethod;
      this.buy.$user=this.paymentMethod.$yng_Card.user;
      console.log(JSON.stringify(this.buy));
      this.buyService.saveBuy(this.buy).subscribe(
        res => {
              this.msg = JSON.parse(JSON.stringify(res))._body;
              this.redirectTo();
            },
            error => console.log(error)
      )
    }
  }

  redirectTo(){
    if(this.msg=='save'){
      alert("compra realizada exitosamente revise su bandeja de entrada");
      this.router.navigate(['/']);   
    }
    else{
      alert(this.msg);
    } 
  }
  updateUser(){
    this.User.phone=this.phone;
    this.buyService.updateUser(this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            if(this.msg=='save'){
              this.sw=true;
              this.buyItem();
            }
            else{
              alert(this.msg);
            } 
          },
          error => console.log(error)
    );

    this.popup=true;
  }

}
