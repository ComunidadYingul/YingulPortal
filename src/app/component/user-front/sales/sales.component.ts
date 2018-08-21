import { Component, OnInit } from '@angular/core';
import { Buy } from '../../../model/buy';
import { user } from '../../../model/user';
import { BuyService } from '../../../service/buy.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { Network } from '../../../model/Network';
import { UserService } from '../../../service/user.service';
import { Person } from '../../../model/person';
import { ShippingTraceability } from '../../../model/shipping-traceability';
import { ShippingState } from '../../../model/shipping-state';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  listSales:Buy[];
  User: user=new user();
  buyTemp:Buy =new Buy(); 
  codSeg:string;
  hiddenPop:boolean=true;
  dateString:string;
  dateStringA:string;
  newDateA:Date;
  newDate:Date;
  person:Person= new Person();
  traceability:ShippingTraceability= new ShippingTraceability();
  arrayState:ShippingState[];
  state1:string;
  constructor(private userService:UserService,private router: Router, private buyService:BuyService, private loginService: LoginService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
    this.buyService.getSalesForUser(this.User.username).subscribe(
			res => {
              this.listSales = JSON.parse(JSON.parse(JSON.stringify(res))._body);   
      		},
      		error => console.log(error)
    );
    this.getPerson();
  }
	getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
            this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }
  onConfirm(buyTemp2:Buy){
    this.codSeg=buyTemp2.shipping.yng_Shipment.shipmentCod;
    this.buyService.getStateShipping(this.codSeg).subscribe(
      res => {
        
        this.state1 = "{\"FechaAlta\":\"2018-08-16T13:22:52-03:00\",\"Eventos\":{\"Evento_\":[{\"Sucursal\":\"-\",\"Fecha\":\"2018-08-16T13:22:52-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"30\",\"Estado\":\"Envío no ingresado\"},{\"Sucursal\":\"Sucursal Moreno (Bs. As.)\",\"Fecha\":\"2018-08-16T14:53:57-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"25\",\"Estado\":\"Envío ingresado al circuito operativo\"},{\"Sucursal\":\"Sucursal Moreno (Bs. As.)\",\"Fecha\":\"2018-08-16T18:29:29-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"21\",\"Estado\":\"Envío en tránsito a sucursal de Andreani\"},{\"Sucursal\":\"Planta de Operaciones Bs. As.\",\"Fecha\":\"2018-08-16T20:16:47-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"20\",\"Estado\":\"Envío en sucursal de Andreani\"},{\"Sucursal\":\"Planta de Operaciones Bs. As.\",\"Fecha\":\"2018-08-17T04:16:17-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"21\",\"Estado\":\"Envío en tránsito a sucursal de Andreani\"},{\"Sucursal\":\"Sucursal San Miguel (Bs. As.)\",\"Fecha\":\"2018-08-17T07:16:37-03:00\",\"IdMotivo\":\"-1\",\"Motivo\":{},\"IdEstado\":\"17\",\"Estado\":\"Envío en custodia en sucursal de Andreani\"}]},\"NombreEnvio\":\"Encomienda\",\"NroAndreani\":\"310000005335214\"}";
        this.traceability=JSON.parse(this.state1);
        this.arrayState=this.traceability.Eventos.Evento_;
        for(var j=0; j<this.arrayState.length; j++){
          this.arrayState[j].Fecha=this.arrayState[j].Fecha.replace("T"," ");
        }
        this.traceability.Eventos.Evento_= this.arrayState;

        this.hiddenPop=false;

        },
        error => console.log(error)
    ); 
  }
  logout(){
		localStorage.setItem('user', '');
		localStorage.removeItem('user');
		this.loginService.logout().subscribe(
			res => {
				localStorage.setItem('user', '');
				localStorage.removeItem('user');
			},
			err => console.log(err)
			);
		location.reload();
		//this.router.navigate(['/login']);
	}
  aceptar(){
    this.hiddenPop=true;
  }
  printTicket(buyTemp2:Buy){
    this.codSeg=buyTemp2.shipping.yng_Shipment.shipmentCod;
    this.buyService.getLinkPdf(this.codSeg).subscribe(
      res => {
         var Linkpdf = JSON.parse(JSON.stringify(res))._body; 
        console.log("Linkpdf:"+Linkpdf);
        window.open(Linkpdf,"_blank");
          },
          error => console.log(error)
    ); 
  }
}
