import { Component, OnInit } from '@angular/core';
import { Query } from '../../../../model/query';
import { QueryServiceService } from '../../../../service/query-service.service';
import { user } from '../../../../model/user';
import { Router } from '@angular/router';
import { query } from '@angular/core/src/animation/dsl';
import { Network } from '../../../../model/Network';
import { LoginService } from '../../../../service/login.service';

@Component({
  selector: 'app-query-sales',
  templateUrl: './query-sales.component.html',
  styleUrls: ['./query-sales.component.css']
})
export class QuerySalesComponent implements OnInit {
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
  constructor(private queryService:QueryServiceService,private router: Router,private loginService: LoginService) {
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
  }
  getQuery() {
    this.queryService.getQueryBySeller(this.User).subscribe(
			res => {
            this.queryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getQueryWithOutAnswer(){
    this.queryService.getQueryBySellerAndStatus(this.User,"pending").subscribe(
			res => {
            this.queryWithoutAnswer = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getQueryWithAnswer(){
    this.queryService.getQueryBySellerAndStatus(this.User,"responded").subscribe(
			res => {
            this.queryWithAnswer = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  onConfirm(query:Query){
    this.query=query;
    this.popup=false;
  }
  cancel(){
    this.answer="";
    this.popup=true;
  }
  answerTo(){
    this.popup=true;
    this.popup2=false;
    this.query.answer=this.answer;
    this.query.yng_Item.user.authorities=null;
    this.query.user.authorities=null;
    this.query.seller.authorities=null;
    this.queryService.postAnswerQuery(this.query).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
            this.ngOnInit();
            this.popup2=true;
          },
          error => console.log(error)
    )
  }
  isFormValid(){
    if(this.answer==""||this.answer==null){
      return true;
    }else{
      return false;
    }

  }
  redirectTo(){
    if(this.msg=='save'){

    }else{
      alert("Algo salio mal vuelve a intentarlo");
      
    } 
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
