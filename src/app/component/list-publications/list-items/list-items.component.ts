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
  countryList:Country[];
  countryTemp:Country=new Country();
  country:Country= new Country();
  countryName:string;
  public city:City = new City();  
  public cityTem:City = new City();
  public additional:string;
  provinceList: Object[];
  provin:string;
  countruHidden:boolean=false;
  barrioList : Object[];
  constructor(private itemDetailService : ItemDetailService,private sellService: SellService) {
    this.cityHid=true;
   }

  ngOnInit() {
    this.getItemsBySeller();
    this.sellService.getCountries().subscribe(
			res => {
        		this.countryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
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
        this.popupUbication=false;       
        this.ubication=this.item.yng_Ubication;
        
        this.ubicationTemp=this.ubication;
        
        this.aditional=this.ubicationTemp.aditional;
        console.log("ubication:"+JSON.stringify(this.ubicationTemp)+"aditional:"+this.aditional);
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
  getCountry(countryId : number){
    this.countryHidden=true;
    var ret;
  for(let p of this.countryList){
    this.countryTemp=JSON.parse(JSON.stringify(p));
    if(countryId==this.countryTemp.countryId){              
      console.log("contry: " +JSON.stringify(this.countryTemp));
      this.country=this.countryTemp;
    }     
    this.countryName=this.country.name     
  }
} 
keyPressCP(event: any){
  const pattern = /[0-9]/;
  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
}
cambiarCP(){
  this.cityHid=true;
  this.postalCode="";
  this.number="";
  this.street="";
  this.aditional="";
  this.department="";
  this.withinStreets="";
  this.btnCP=false;
}
getBarrio(cityId : number){
  this.city.cityId=cityId;
  console.log("cityId:"+cityId);
  var ret="";
  for(let c of this.cityList){
    this.cityTem=JSON.parse(JSON.stringify(c));
    if(cityId==this.cityTem.cityId){ 
      ret=this.cityTem.codigopostal;
    }
  }
}
aceptar(){ 
  this.ubicationTemp.aditional=this.aditional
  //his.ubicationTemp.codAndreani
  this.ubicationTemp.department=this.department
  this.ubicationTemp.number=this.number
  this.ubicationTemp.postalCode=this.codigoPostalE
  this.ubicationTemp.street=this.street
  //this.ubicationTemp.ubication_id
  this.ubicationTemp.withinStreets=this.withinStreets
  this.ubicationTemp.yng_Barrio=this.yng_Barrio
  this.ubicationTemp.yng_City=this.yng_city
  this.ubicationTemp.yng_Country=this.yng_Country
  this.ubicationTemp.yng_Province=this.yng_Province
  var ubicationtemporal:Ubication=new Ubication();
  this.itemDetailService.postUpdateMotorized(this.item).subscribe(
    res => {
      console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);
        },
        error => console.log(error)
  );  
}
cancel(){
  this.popupUbication=true;
  this.countruHidden=false
}
getProvince(countryId:number){
  this.country.countryId=countryId;
  this.provinceList=null;
  this.cityHid=true;
  this.barrioHid=true;
  this.countruHidden=true;
  this.sellService.getProvinces(countryId).subscribe(
    res => {
          this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
          //this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);

        },
        error => console.log(error)
  )
}
getCity(provinceId : number){
  this.province.provinceId=provinceId;
   this.cityList=[];
   this.sellService.getCities(provinceId).subscribe(
     res => {
           this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
           this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);
          // alert("this.provin:"+this.provin);
           if(JSON.stringify(this.cityList)=="[]"){
             this.cityHid=true;
             this.barrioHid=true;
           } 
           else{
             this.cityHid=false;
           }
         },
         error => console.log(error)
   )
 }
 setBarrio(barrioId:number){
  //this.barrio.barrioId=barrioId;
}
}
