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
  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }
  sendEmail(){
    this.User.email=this.email;
    this.loginService.sendRecoveryEmail(this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => console.log(error)
    );
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("mensaje enviado exitosamente, revisa tu bandeja de entrada");
    }else{
      alert(this.msg);
    } 
  }
}
