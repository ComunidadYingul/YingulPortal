import { Component, OnInit } from '@angular/core';
import { user } from '../../model/user';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { Network } from '../../model/Network';

@Component({
  selector: 'app-user-front',
  templateUrl: './user-front.component.html',
  styleUrls: ['./user-front.component.css']
})
export class UserFrontComponent implements OnInit {
	BUCKET_URL:string=Network.BUCKET_URL;
  User: user=new user();
  constructor(private loginService: LoginService, private router: Router) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
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
