import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryServiceService } from '../../service/query-service.service';
import { user } from '../../model/user';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  User: user=new user();
  queriesNumber:number=0;
  queries : Object[]=[];
  answer: string;
  query:Object;
  msg:string;
  constructor(private router: Router,private queryService : QueryServiceService) { 
    
  }
  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.router.navigate(['/login']);
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
    this.getQueries();
  }
  getQueries(){
		this.queryService.getQueriesByUser(this.User.username).subscribe(
			res => {
            this.queriesNumber = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    this.queryService.getQueriesListByUser(this.User.username).subscribe(
			res => {
            this.queries = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.queries=this.queries.sort();
            console.log(JSON.stringify(this.queries));
      		},
      		error => console.log(error)
    );
  }
  postAnswerQuery(query:Object){
    this.query=Object.assign(query, {"answer":this.answer,"yng_Item":null,"user":null});
    this.queryService.postAnswerQuery(this.query).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }

  redirectTo(){
    if(this.msg=='save'){
      alert("se respondio exitosamente");
      location.reload();
    }
    else{
      alert(this.msg);
    } 
  }
}
