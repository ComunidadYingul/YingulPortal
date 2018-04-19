import { Component, OnInit } from '@angular/core';
import { Network } from '../../../../model/Network';
import { Query } from '../../../../model/query';
import { user } from '../../../../model/user';
import { QueryServiceService } from '../../../../service/query-service.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { Person } from '../../../../model/person';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-query-purchases',
  templateUrl: './query-purchases.component.html',
  styleUrls: ['./query-purchases.component.css']
})
export class QueryPurchasesComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  queryList:Query[];
  queryWithoutAnswer:Query[];
  queryWithAnswer:Query[];
  User:user=new user();
  popup2:boolean=true;
  popup:boolean=true;
  query:Query=new Query();
  answer:string;
  msg:string;
  person:Person= new Person();
  constructor(private userService:UserService,private queryService:QueryServiceService,private router: Router,private loginService: LoginService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
  }

  ngOnInit() {
    this.getQuery();
    this.getQueryWithOutAnswer();
    this.getQueryWithAnswer();
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
  getQuery() {
    this.queryService.getQueryByBuyer(this.User).subscribe(
			res => {
            this.queryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getQueryWithOutAnswer(){
    this.queryService.getQueryByBuyerAndStatus(this.User,"pending").subscribe(
			res => {
            this.queryWithoutAnswer = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getQueryWithAnswer(){
    this.queryService.getQueryByBuyerAndStatus(this.User,"responded").subscribe(
			res => {
            this.queryWithAnswer = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  deleteQuery(queryId:number){
    this.popup2=false;
    this.queryService.deleteFavorite(queryId,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
            this.ngOnInit();
            this.popup2=true;
          },
          error => console.log(error)
    );
  }
  redirectTo(){
    if(this.msg=='save'){

    }else{
      alert("Algo salio mal vuelve a intentarlo");
      
    } 
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

}
