import { Component, OnInit } from '@angular/core';
import { Buy } from '../../../model/buy';
import { user } from '../../../model/user';
import { BuyService } from '../../../service/buy.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { State } from '../../../model/state';
import { Network } from '../../../model/Network';
import { UserService } from '../../../service/user.service';
import { Person } from '../../../model/person';

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
  state:State=new State;
  dateString:string;
  dateStringA:string;
  newDateA:Date;
  newDate:Date;
  person:Person= new Person();
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
    console.log("codSeg:"+this.codSeg);
    this.buyService.getStateShipping(this.codSeg).subscribe(
      res => {
        this.state = JSON.parse(JSON.parse(JSON.stringify(res))._body); 
        this.state.estado
        this.state.fecha
        this.state.fechaAlta
        this.state.motivo
        this.state.nombreEnvio
        this.state.nroAndreani
        this.state.sucursal

        this.dateStringA = this.state.fechaAlta; 
        this.newDateA = new Date(this.dateStringA);

        this.dateString = this.state.fecha; 
        this.newDate = new Date(this.dateString);
        this.hiddenPop=false;
        console.log("postUpdateProduct: "+JSON.parse(JSON.stringify(res))._body);

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
