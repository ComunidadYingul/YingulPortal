import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Router } from '@angular/router';
import { Service } from '../../../model/service';
import { Person } from '../../../model/person';
@Component({
  selector: 'app-idetail',
  templateUrl: './idetail.component.html',
  styleUrls: ['./idetail.component.css']
})
export class IdetailComponent implements OnInit {
  @Input('itemId') localItemId:number;
  itemType:string;
  Service:Service= new Service();
  Seller:Person= new Person();
  usernameSeller:string;
  itemsBySeller: Object[]=[];
  imageByItem:Object[]=[];
  categoriesByItem:Object[]=[];
  queryByItem:Object[]=[];
  queryLength:number;
  query: string;
  oneQuery:Object= new Object();
  msg:string;
  spinner: boolean=false;
  constructor(private itemDetailService : ItemDetailService, private router : Router){ 
    
  }

  ngOnInit() {
    this.itemDetailService.getItemType(this.localItemId).subscribe(
			res => {
            this.itemType = JSON.parse(JSON.stringify(res))._body;
            this.getItem(this.itemType,this.localItemId);
      		},
      		error => console.log(error)
    );
    //Daniel oredanar la llamada a los metodos de este controlador 
    //creo que toda las llamadas a los metodos debene estar qui pero no se si funcionen
    this.getImageByItem();
    this.getCategoriesByItem();
    this.getQueryByItem();
  }
  getItem(itemType:string, itemId: number){
    this.itemDetailService.getItem(itemType,itemId).subscribe(
			res => {
          //aqui poner un switch por que no siempre devolvera un service
            this.Service = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.Service));
            // tener cuidado de seguir llamando a los demas metodos de esta clase
            this.getSeller(this.Service);
      		},
      		error => console.log(error)
    )
  }
  getSeller(service:Service){

    this.usernameSeller=JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(service)).yng_Item)).user)).username);
    this.itemDetailService.getSeller(this.usernameSeller).subscribe(
			res => {
            this.Seller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(this.Seller);
      		},
      		error => console.log(error)
    );
    this.getItemsBySeller();

  }
  getItemsBySeller() {
    this.itemDetailService.getItemsBySeller(this.usernameSeller).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(this.itemsBySeller);
      		},
      		error => console.log(error)
    );
    
  }
  getImageByItem(){
    this.itemDetailService.getImageByItem(this.localItemId).subscribe(
			res => {
            this.imageByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(this.imageByItem);
      		},
      		error => console.log(error)
    );
  }

  getCategoriesByItem(){
    this.itemDetailService.getCategoriesByItem(this.localItemId).subscribe(
			res => {
            this.categoriesByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.categoriesByItem=this.categoriesByItem.sort();
            console.log(JSON.stringify(this.categoriesByItem));
      		},
      		error => console.log(error)
    );
  }
  getQueryByItem(){
    this.itemDetailService.getQueryByItem(this.localItemId).subscribe(
			res => {
            this.queryByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.queryByItem = this.queryByItem.sort();
            this.queryLength= this.queryByItem.length;
            console.log(JSON.stringify(this.queryByItem));
      		},
      		error => console.log(error)
    );
  }
  onSubmit(){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.router.navigate(['/login']);
		} else {
			this.spinner=true;
      //probablemente para crear un nuevo servicio funciones con el promise 
      /*var promise = new Promise((resolve, reject) => {
          setTimeout(() => {
          console.log("Async Work Complete");
          resolve();
        }, 100000);
      });*/
      this.oneQuery={"query":this.query,"user":JSON.parse(localStorage.getItem("user")),"yng_Item":{"itemId":this.localItemId}};
      this.itemDetailService.postQuery(this.oneQuery).subscribe(
        res => {
          this.msg = JSON.parse(JSON.stringify(res))._body;
          if(this.msg=='save'){
            location.reload();
          }
          else{
            alert(this.msg);
          } 
        },
        error => console.log(error)
      );
      this.spinner=false;
		}
    
  }
}
