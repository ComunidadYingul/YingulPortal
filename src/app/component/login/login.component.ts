import { Component, OnInit } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import {LoginService} from '../../service/login.service';
import { user } from '../../model/user';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
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

	constructor (private loginService: LoginService,private router: Router,private location: Location) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.location.back();
    }
  }
  
  onSubmit() {
  	this.loginService.sendCredential(this.username, this.password).subscribe(
      res => {
        this.User.username = JSON.parse(JSON.stringify(res))._body;
        this.User.password = btoa(this.User.username+":"+this.password);
        this.loggedIn=true;
        this.saveLocalStorage();
        location.reload();
      },
      err => alert("Usuario o Contraseña incorrecta")
    );
  }

  ngOnInit() {}

  saveLocalStorage(){
    let User :user = this.User;
    localStorage.setItem("user", JSON.stringify(User));

  }
}
