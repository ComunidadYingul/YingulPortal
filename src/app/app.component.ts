import { Component } from '@angular/core';
import { user } from './model/user';
import { Person } from './model/person';
import { UserService } from './service/user.service';
import { Network } from './model/Network';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	BUCKET_URL:string=Network.BUCKET_URL;
  title = 'app';
  menu: boolean=false;
  loggedIn: boolean=false;
	User: user=new user();
	more:boolean=true;
	person:Person=new Person();
	purchasesMenu:boolean=true;
	userMenu:boolean=true;
	salesMenu:boolean=true;
	configurationMenu:boolean=true;
	payMenu:boolean=true;
  menuE(ev){
    this.menu=!this.menu;
	}
	constructor(private userService:UserService){

	}
  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.loggedIn = false;
			this.User = new user();
		} else {
			this.loggedIn = true;
			this.User=JSON.parse(localStorage.getItem("user"));
			this.getPerson();
  	}
	}

	getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
						this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }
  logout(){
		localStorage.setItem('user', '');
		localStorage.removeItem('user');
		/*this.loginService.logout().subscribe(
			res => {
				localStorage.setItem('user', '');
				localStorage.removeItem('user');
			},
			err => console.log(err)
			);*/
		location.reload();
		//this.router.navigate(['/login']);
	}
	showPurchasesMenu(){
		this.purchasesMenu=!this.purchasesMenu;
	}
	showSalesMenu(){
		this.salesMenu=!this.salesMenu;
	}
	showConfigurationMenu(){
		this.configurationMenu=!this.configurationMenu;
	}
	showPayMenu(){
		this.payMenu=!this.payMenu;
	}
	showUserMenu(){
		this.userMenu=!this.userMenu;
	}
}
