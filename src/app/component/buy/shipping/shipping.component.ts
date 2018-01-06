import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../model/item';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  @Input('quantity') quantity:number;
  @Output() typeShip = new EventEmitter();
  branch:boolean=true;
  sendHome:boolean=true;
  @Input('Item') Item:Item;
  constructor() { }
  
  ngOnInit() {
  }

  check(typebuy:string){
    switch (typebuy) {
      case "branch":
        this.branch= false;
        this.sendHome=true;
        break;
      case "home":
        this.branch= true;
        this.sendHome=true;
        break;
      case "sendHome":
        this.branch= true;
        this.sendHome=false;
        break;
      default:

    }
  }
  sendTypeShip(){
    this.typeShip.emit("envio");
  }
}
