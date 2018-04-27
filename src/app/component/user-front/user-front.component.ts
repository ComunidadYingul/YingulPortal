import { Component, OnInit } from '@angular/core';
import { user } from '../../model/user';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { Network } from '../../model/Network';
import { Person } from '../../model/person';
import { UserService } from '../../service/user.service';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account';
import { QueryServiceService } from '../../service/query-service.service';
import { ConfirmService } from '../../service/confirm.service';

@Component({
  selector: 'app-user-front',
  templateUrl: './user-front.component.html',
  styleUrls: ['./user-front.component.css']
})
export class UserFrontComponent implements OnInit {
	BUCKET_URL:string=Network.BUCKET_URL;
	User: user=new user();
	person:Person= new Person();
	account:Account = new Account();
	money:number;
	queries:number=0;
	deliveries:number=0;
	profilePorcentage:number=0;
  constructor(private confirmService :  ConfirmService, private queryService : QueryServiceService,private accountService:AccountService,private userService:UserService,private loginService: LoginService, private router: Router) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
		this.getPerson();
		this.accountService.getAccountByUser(this.User.username).subscribe(
			res => {
            if(JSON.parse(JSON.stringify(res))._body==""){
              alert("Su cuenta esta bloqueada o expirada pongase en contacto con Yingul");
              this.router.navigate(['/']); 
            }else{
              this.account = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
              this.money=this.account.availableMoney+this.account.releasedMoney+this.account.withheldMoney;    
            }
      		},
      		error => console.log(error)
		);
		this.queryService.getQueriesByUser(this.User.username).subscribe(
			res => {
            this.queries = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
		);
		this.confirmService.getNumberPendingDeliveriesForUser(this.User.username).subscribe(
			res => {
						this.deliveries = JSON.parse(JSON.parse(JSON.stringify(res))._body);
						alert(this.deliveries);
      		},
      		error => console.log(error)
		);
  }
	getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
						this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
						if(this.person.yng_User.phone!=""&&this.person.yng_User.phone!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.person.yng_User.phone2!=""&&this.person.yng_User.phone2!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.person.yng_User.yng_Ubication!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.person.yng_User.profileBanner!="sampleBanner.jpg"&&this.person.yng_User.profileBanner!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.person.yng_User.profilePhoto!="profile.jpg"&&this.person.yng_User.profilePhoto!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.person.yng_User.profileVideo!="https://www.youtube.com/embed/1AV37mvCHQo"&&this.person.yng_User.profileVideo!=null){
							this.profilePorcentage=this.profilePorcentage+17;
						}
						if(this.profilePorcentage>100){
							this.profilePorcentage=100;
						}
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
