import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {
  
  @Output() typeItemS = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }
  public chooseProperty(){
    this.typeItemS.emit('Property');
  }
  public chooseMotorized(){
    this.typeItemS.emit('Motorized');
  }
  public chooseService(){
    this.typeItemS.emit('Service');
  }
  public chooseProduct(){
    this.typeItemS.emit('Product');
  }

}
