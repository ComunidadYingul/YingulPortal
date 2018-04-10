import { Component, OnInit } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import {LoginService} from '../../service/login.service';
import { user } from '../../model/user';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Person } from '../../model/person';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  username: string;
  password: string;
  User: user = new user();
  person:Person= new Person();
  hidUsername:boolean=true;
  hidPassword:boolean=true;
  popup_g:boolean=true;


	constructor (private loginService: LoginService,private router: Router,private location: Location, private userService:UserService) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.location.back();
    }
  }
  
  onSubmit() {
    this.reset();
    if(this.username==null || this.username==""){
      this.hidUsername=false;
    }else if(this.password==null || this.password==""){
      this.hidUsername=true;
      this.hidPassword=false;
    }
    else{
      this.popup_g=false;
      this.hidUsername=true;
      this.hidPassword=true;
      this.loginService.sendCredential(this.username, this.password).subscribe(
        res => {
          this.User.username = JSON.parse(JSON.stringify(res))._body;
          this.User.password = btoa(this.User.username+":"+this.password);
          this.loggedIn=true;
          this.getPerson();
        },
        err => {
          this.popup_g=true;
          alert("Usuario o Contraseña incorrecta")
        }
      );
    }
  }

  ngOnInit() {}

  saveLocalStorage(){
    let User :user = this.User;
    localStorage.setItem("user", JSON.stringify(User));

  }

  reset(){
    this.hidUsername=true;
    this.hidPassword=true;
  }
  getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
            this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.User.profilePhoto=this.person.yng_User.profilePhoto;
            this.saveLocalStorage();
            location.reload();
      		},
      		error => console.log(error)
    );
    
  }
}
