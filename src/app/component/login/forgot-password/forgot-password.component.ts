import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { user } from '../../../model/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  User:user= new user();
  msg:string;
  email:string;

  hidEmail:boolean=true;
	hidEmailVal:boolean=true;
  popup_g:boolean=true;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }
  sendEmail(){
    this.hidEmailVal=true;
    var patron = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
		if(this.email==null || this.email==""){
			this.hidEmail=false;
		}else if(!patron.test(this.email)){
			this.hidEmailVal=false;
		}
    else{
      this.popup_g=false;
      this.User.email=this.email;
      this.loginService.sendRecoveryEmail(this.User).subscribe(
        res => {
              this.popup_g=true;
              this.hidEmailVal=true;
              this.hidEmail=true;
              this.msg = JSON.parse(JSON.stringify(res))._body;
              this.redirectTo();
            },
            error => {
              console.log(error);
              this.popup_g=true;
            }
      );
    }
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("mensaje enviado exitosamente, revisa tu bandeja de entrada");
    }else{
      alert(this.msg);
    } 
    this.email="";
  }
}
