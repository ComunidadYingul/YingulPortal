import { Component, OnInit } from '@angular/core';
import { user } from '../../../model/user';
import { Account } from '../../../model/account';
import { Router } from '@angular/router';
import { AccountService } from '../../../service/account.service';
import { LoginService } from '../../../service/login.service';
import { Network } from '../../../model/Network';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  User: user=new user();
  account:Account = new Account();
  money:number;
  popup:boolean=true;
  constructor(private router: Router, private accountService:AccountService, private loginService: LoginService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
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
