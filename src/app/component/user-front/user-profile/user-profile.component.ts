import { Component, OnInit } from '@angular/core';
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { Person } from '../../../model/person';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  User: user=new user();
  person:Person= new Person();
  constructor(private router: Router, private userService:UserService, private loginService: LoginService) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getPerson();
    }
   }

  ngOnInit() {
  }
  getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
            this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.person));
      		},
      		error => console.log(error)
    );
    
  }
  updateUsername(){
    alert("username");
  }
  updatePassword(){
    alert("password");
  }
  updateEmail(){
    alert("email");
  }
  setPhone(){
    alert("phone");
  }
  updatePhone(){
    
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
