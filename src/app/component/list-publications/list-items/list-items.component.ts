import { Component, OnInit } from '@angular/core';
import { user } from '../../../model/user';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Network } from '../../../model/Network';
import { Ubication } from '../../../model/ubication';
import { SellService } from '../../../service/sell.service';
import { Province } from '../../../model/province';
import { Item } from '../../../model/item';
import { Barrio } from '../../../model/barrio';
import { City } from '../../../model/city';
import { Country } from '../../../model/country';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  itemsBySeller: Object[]=[];
  useri:user=new user();
  userNameP:string;
  deleteList:number[]=[];
  countryHidden:boolean=true;
  btnCP:boolean=false;
  cityHid:boolean=true;
  codigoPostalE:string;
  cityList: Object[];
  barrioHid:boolean;
  provinciaCP:string;
  provinciaID:number;
  public province:Province = new Province();
  postalCode:string;
  popupUbication:boolean=true;
  ubication:Ubication=new Ubication();
  item:Item=new Item();
  street:string;
  number:string;
  department:string;
  withinStreets:string;
  ubicationTemp:Ubication = new Ubication();
  aditional:string;
  yng_Barrio:Barrio=new Barrio();
  yng_city:City=new City();
  yng_Country:Country=new Country();
  yng_Province:Province=new Province();
  constructor(private itemDetailService : ItemDetailService,private sellService: SellService) {
    this.cityHid=true;
   }

  ngOnInit() {
    this.getItemsBySeller();
  }
  getItemsBySeller() {
    this.useri=JSON.parse(localStorage.getItem("user"));
    this.userNameP=this.useri.username;
    this.itemDetailService.getItemsBySeller(this.userNameP).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log("items:"+JSON.stringify(this.itemsBySeller));
      		},
      		error => console.log(error)
    );
    
  }
  onConfirm(){}
  changeUbi(idItem:number){


    this.cityHid=false;
    console.log("idItem :"+idItem);
    this.getItem(idItem);
    
  }
  buscarCP(){
    if(this.codigoPostalE==""){alert("Introduzca un Código Postal");
  }
    else{

      this.cityList=[];

      this.sellService.getCP(this.codigoPostalE).subscribe(
        res => {
              this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);

              
  
              if(JSON.stringify(this.cityList)=="[]"){
                
                this.cityHid=true;
                this.barrioHid=true;
                alert("no se encontro el codigo postal ");
              } 
              else{
                this.provinciaCP=JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.name);
                this.provinciaID=parseInt(JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.provinceId));
              
                this.province.provinceId=this.provinciaID;
                
                this.cityHid=false;
                this.postalCode=this.codigoPostalE;
                this.btnCP=true;  
                             
              }
            },
            error => console.log(error)
      )
    }

  }
  getItem(idItem:number){
    this.itemDetailService.getItemById(idItem).subscribe(
      res=>{
        this.item=JSON.parse(JSON.parse(JSON.stringify(res))._body);        
        this.ubication=this.item.yng_Ubication;
        console.log("res:"+JSON.stringify(this.ubication));
        this.ubicationTemp=this.ubication;

        this.aditional=this.ubicationTemp.aditional;
        //this.codAndreani=this.ubicationTemp.codAndreani;
        this.department=this.ubicationTemp.department;
        //this.latitud=this.ubicationTemp.latitud;
        //this.longitud=this.ubicationTemp.longitud;
        this.number=this.ubicationTemp.number;
        this.postalCode=this.ubicationTemp.postalCode;
        this.street=this.ubicationTemp.street;
        
        this.withinStreets=this.ubicationTemp.withinStreets;
        this.yng_Barrio=this.ubicationTemp.yng_Barrio;
        this.yng_city=this.ubicationTemp.yng_City;
        this.yng_Country=this.ubicationTemp.yng_Country;
        this.yng_Province=this.ubicationTemp.yng_Province;
        
      },
      error =>{console.log(error)}
    )
  }  
}
