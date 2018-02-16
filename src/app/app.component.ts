import { Component } from '@angular/core';
import { user } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menu: boolean=true;
  loggedIn: boolean=false;
	User: user=new user();
	more:boolean=true;
  menuE(ev){
    this.menu=!this.menu;
  }
  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.loggedIn = false;
			this.User = new user();
		} else {
			this.loggedIn = true;
			this.User=JSON.parse(localStorage.getItem("user"));
		}
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

}
