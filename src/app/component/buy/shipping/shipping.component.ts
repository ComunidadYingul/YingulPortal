import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../model/item';
import { Cotizar } from '../../../model/cotizar';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AndreaniCot } from '../../../model/andreaniCot';
import { AndreaniCotizacion } from '../../../model/andreaniCotizacion';
import { AndreaniCotizacionRespuesta } from '../../../model/andreaniCotizacionRespuesta';
import { AndreaniSucursalRespuesta } from '../../../model/andreaniSucursalRespuesta';
import { Product } from '../../../model/product';
import { sucursalAndreani } from '../../../model/sucursalAndreani';

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
  priceSuc:string="";
  popupSucursal:boolean=true;
  //buscarCP:string;
  @Input('Item') Item:Item;


  //////////
  
  public cotizar:Object; 
  public andraniCot:AndreaniCot =new AndreaniCot();
  public andreaniCotizacion:AndreaniCotizacion=new AndreaniCotizacion();
  postalCode:string;
  Cotizar:Cotizar=new Cotizar();
  cotizarTemp:AndreaniCotizacion;
    sucursalTemp:AndreaniCot;
    andreaniCotizacionRespuesta:AndreaniCotizacionRespuesta=new AndreaniCotizacionRespuesta();
    andreaniSuc:Object[];
    andreaniSucursalRespuesta:AndreaniSucursalRespuesta=new AndreaniSucursalRespuesta();
    popupCotizar:boolean=true;
    Product:Product= new Product();
    sucursalAndre:string;
    resumen:string;
    direccion:string;
    horadeTrabajo:string; 



  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService) { 

  }

  
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
    if(this.andreaniCotizacionRespuesta==null)
    {
      alert("debe selecionar un metodo");
    }
    else{
      this.typeShip.emit("envio");

    }

  }


  buscar(){

    }
    popup:boolean=true;
    calcularCosto(){
      this.popup=false;
    }
    buscarCP:string="";
    //postalCode:string;
 


    buscarSucursales(){
      this.popupSucursal=true;
      this.andreaniSucursalRespuesta=null;
      this.andreaniCotizacionRespuesta=null;

      
            if(this.postalCode!=""){
              this.getItem("Producto",this.Item.itemId); 
            }
            else {
              var codigoPostalSel="";
              
              if(this.postalCode=="")codigoPostalSel=codigoPostalSel+"\n -Un Código postal";
              alert("Para realizar una cotización debe agregar:"+codigoPostalSel);
        
            }
    }

    sucursalLLenar(){
      console.log("this.postalCode:"+this.postalCode);
          
          this.andraniCot.username="";
          this.andraniCot.password="";
          this.andraniCot.codigoPostal=this.postalCode;
          this.andraniCot.provincia="";
          this.andraniCot.localidad="";
          this.sendSucursal(this.andraniCot);
    }
    cotizarLLenar(){
          this.andreaniCotizacion.username="";
          this.andreaniCotizacion.password="";             
          this.andreaniCotizacion.codigoDeCliente="";
          this.andreaniCotizacion.numeroDeContrato="";
          this.andreaniCotizacion.codigoPostal=this.postalCode;
          this.andreaniCotizacion.codigoDeSucursal=this.Item.yng_Ubication.codAndreani;
          this.andreaniCotizacion.peso=this.Product.productPeso;
          this.andreaniCotizacion.volumen=this.Product.producVolumen;
          this.andreaniCotizacion.valorDeclarado=""+this.Item.price;          
          this.sendCotizar(this.andreaniCotizacion);

    }


    
    sendCotizar(coti:AndreaniCotizacion){
      this.cotizarTemp=coti;
      console.log("envio: "+JSON.stringify(this.cotizarTemp));
      this.itemDetailService.sendCotizaAndreani(this.cotizarTemp).subscribe(
        res => {
        
          this.andreaniCotizacionRespuesta=JSON.parse(JSON.parse(JSON.stringify(res))._body);
        

             if(this.andreaniCotizacionRespuesta.tarifa!=""){
               this.popupCotizar=false;
               this.mostrarCotizacion();
               this.mostrarSucursal();
              }
             else {
               this.popupCotizar=true; 
              alert("Código postal invalido");};
              console.log("else tarifa: ");
            },
            error => console.log(error)
      );
     
  
    }

    sendSucursal(suc:AndreaniCot){
      this.sucursalTemp=suc;
      this.itemDetailService.sendSucursalAndreani(this.sucursalTemp).subscribe(
        res=>{
         
          this.andreaniSucursalRespuesta=JSON.parse(JSON.parse(JSON.stringify(res))._body);
         

          if(this.andreaniSucursalRespuesta.numero!=""){
            this.cotizarLLenar();

          }
          console.log("this.andreaniSucursalRespuesta.descripcion:"+this.andreaniSucursalRespuesta[0].descripcion);

        }
      );
      
    }



    
    getItem(itemType:string, itemId: number){
      this.itemDetailService.getItem(itemType,itemId).subscribe(
        res => {
              switch (itemType) {
                case "Producto":
                  this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                //  console.log( "Producto: "+this.Product.productPeso+" volumen:"+this.Product.producVolumen);
                break;


                default:
                  alert("error");
                 

              }
              if(this.Product.productPeso!=""){
                this.sucursalLLenar();
              }
            },
            error => console.log(error)
      )
    }


    mostrarSucursal(){
      this.sucursalAndre=""+this.andreaniSucursalRespuesta[0].resumen+"\r\n" + this.andreaniSucursalRespuesta[0].direccion+"\r\n" +this.andreaniSucursalRespuesta[0].horadeTrabajo;
      this.sucursalAndre="Andreani";
      this.resumen=this.andreaniSucursalRespuesta[0].resumen;
      this.direccion=this.andreaniSucursalRespuesta[0].direccion;
      this.horadeTrabajo=this.andreaniSucursalRespuesta[0].horadeTrabajo;  
    }
    mostrarCotizacion(){
      this.priceSuc=this.andreaniCotizacionRespuesta.tarifa;
      this.popupSucursal=false;
      //alert(this.andreaniCotizacionRespuesta.tarifa);


    }
}
