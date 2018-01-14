import { Component, OnInit, Input} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SingupService } from '../../service/singup.service';
import { Router } from '@angular/router';
import { Person } from '../../model/person';
import {Business} from '../../model/business';
import { SellService } from '../../service/sell.service'
import { Province } from '../../model/province';
import { City } from '../../model/city';
import { Barrio } from '../../model/barrio';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  person: Person = new Person();
 
  name: string;
  lastname: string;
  email: string;
  password: string;
  msg: string;
  regDis:boolean;

  business:Business = new Business();
  nameBusiness:string;
  socialName:string;
  isBusiness :boolean;
  typeContri:string;
  phone:string;

  
  datosBusinesType;
  businesType:string;
  datosInscripto;
  datosExcento;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  opcionSeleccionadoPB: string  = '0';
  verSeleccionPB: string        = '';

  isValid: boolean = false;
  isOpcion: boolean = false;
  isAll:boolean=false;
  isPerson:boolean=false;
  isBusinessF:boolean=false;
  //seleccionadoPB:boolean=false;
  seleccionadoI:boolean=false;
  seleccionadoE:boolean=false;
  empresaIf:boolean=true;
  
  

  pos:number=0;

  public province:Province = new Province();
  public city:City = new City();
  public barrio:Barrio = new Barrio();
  provinceList: Object[];
  cityList: Object[];
  barrioList : Object[];
  cityHid:boolean;
  barrioHid:boolean;
  street:string;
  number:string;
  datosI;
  datosE;

  constructor(private singupService: SingupService, private router: Router,private sellService: SellService) { 
    this.regDis=false;
    this.cityHid=true;
    this.barrioHid=true;
    this.datosBusinesType=["Monotributo","Responsable inscripto","Exento"];
    this.datosI = ["Personas","Empresas"];
    this.datosE = ["Personas","Empresas"];
    
    
  }

  onSubmit(){
    //
    if(this.empresaIf){
      this.regPerson();
      
    }    
    else{
      this.regBusiness();
    }

    
  }
  empresa(){
    this.empresaIf=false;
    
    console.log("empresa");
  }

  regPerson(){
    this.regDis=true;
    
        this.person.createPerson(this.name, this.lastname,this.email,this.password);
        console.log("Business envio: "  + JSON.stringify(this.business));
       this.singupService.signUp(this.person).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg=='save'){
                  alert("registrado exitosamente revise su bandeja de entrada");
                  this.router.navigate(['/']);   
                }
                else{
                  alert(this.msg);
                } 
              },
              error => console.log(error)
        )
        this.regDis=false;
  }


  regBusiness(){
    this.regDis=true;
    this.business.$name=this.nameBusiness;
    this.business.$socialName=this.socialName;
    this.business.$isBusiness=this.isBusiness;
    this.business.$typeContri=this.typeContri;
    this.business.$yng_User.$email=this.email;
    this.business.$yng_User.$password=this.password;
    this.business.$yng_User.$phone=this.phone;
    this.business.$yng_User.$yng_Ubication.$street=this.street;
    this.business.$yng_User.$yng_Ubication.$number=this.number;
    this.business.$yng_User.$yng_Ubication.$yng_Province.$provinceId=this.province.$provinceId;
    this.business.$yng_User.$yng_Ubication.$yng_City.$cityId=this.city.$cityId;
    this.business.$yng_User.$yng_Ubication.$yng_Barrio=this.barrio;
   // this.business.$address="Provincia: "+this.province.$provinceId+" Cuidad: "+this.city.$cityId+" Barrio: "+this.barrio.$name+ " Calle:"+this.street+" Número:"+this.number;
    console.log("Business envio: "  + JSON.stringify(this.business));
     this.business.createBusiness(this.nameBusiness,this.socialName,this.email,this.password,this.isBusiness,this.typeContri)
       this.singupService.signUpBusiness(this.business).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg=='save'){
                  alert("registrado exitosamente revise su bandeja de entrada");
                  this.router.navigate(['/']);   
                }
                else{
                  alert(this.msg);
                } 
              },
              error => console.log(error)
        )
        this.regDis=false;



  }


  ngOnInit() {
    this.sellService.getProvinces().subscribe(
			res => {
        		this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
  }

  getCity(provinceId : number){
    this.province.$provinceId=provinceId;
    //this.province.$name=
    this.cityList=[];
    this.sellService.getCities(provinceId).subscribe(
			res => {
            this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
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
  getBarrio(cityId : number){
    this.city.$cityId=cityId;
    this.barrioList=[];
    this.sellService.getBarrio(cityId).subscribe(
			res => {
            this.barrioList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(JSON.stringify(this.barrioList)=="[]"){
              this.barrioHid=true;
            }
            else{
              this.barrioHid=false;
            }
      		},
      		error => console.log(error)
    )
  }
  setBarrio(barrioId:number){
    this.barrio.$barrioId=barrioId;
  }


  capturar() {
    //this.datos = [];
    this.verSeleccion = this.opcionSeleccionado;
    console.log("valor: "+this.verSeleccion);
    
   
    switch(this.verSeleccion) { 
       case "Selecciona una opción": {


          console.log("Selecciona una opción"); 
          break; 
       } 
       case "Monotributo": { 
        this.datosExcento = [];
        this.datosInscripto = [];
         this.isAll=true;
         this.isPerson=true;
         this.isBusinessF=false;
         this.seleccionadoI=false;
         this.seleccionadoE=false;
         this.typeContri= "Monotributo";
         this.isBusiness=false;

          console.log("Monotributo"); 
          break; 
       } 
       case "Responsable inscripto": {

         this.seleccionadoI=true;
         this.seleccionadoE=false;
         this.isAll=false;
         this.isPerson=false;
         this.isBusinessF=false;
         this.typeContri="Responsable inscripto";
       
         
          console.log("Responsable inscripto"); 
          break;    
       } 
       case "Exento": {
        this.seleccionadoI=false; 
        this.seleccionadoE=true;
        this.isAll=false;
        this.isPerson=false;
        this.isBusinessF=false;
        this.typeContri="Exento";
 
          console.log("Exento"); 
          break; 
       }  
       default: {
      
        this.isAll=false;
        this.isPerson=false;
        this.isBusinessF=false;
        
        this.seleccionadoE=false;
        this.seleccionadoI=false;
      
          console.log("Invalid choice"); 
          break;              
       } 
    }

    
}



capturarPB(){
  this.verSeleccionPB = this.opcionSeleccionadoPB;
  console.log("valor: "+this.verSeleccionPB);
  
 
  switch(this.verSeleccionPB) { 
     case "Selecciona una opción": {
        console.log("Selecciona una opción"); 
        break; 
     } 

     case "Personas": {
       
       this.isAll=true;
       this.isPerson=true;
       this.isBusinessF=false;
       this.isBusiness=false;
        console.log("Personas"); 
        break;    
     } 
     case "Empresas": {
      
      this.isAll=true;
      this.isPerson=false;
      this.isBusinessF=true;
      this.isBusiness=true;
        console.log("Empresas"); 
        break; 
     }  
     default: {
      this.isAll=false;
      this.isPerson=false;
      this.isBusinessF=false;
    
      
        console.log("Invalid choice"); 
        break;              
     } 
  }
  
}

keyPress(event: any) {
  const pattern = /[0-9]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}
