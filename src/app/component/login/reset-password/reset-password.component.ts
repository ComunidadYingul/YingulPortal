import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../../../model/reset-password';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  msg:string;
  resetPasswordId:number;
  password:string;
  resetPassword:ResetPassword=new ResetPassword();
  constructor(private loginService:LoginService,private route:ActivatedRoute,private router: Router) {
    this.resetPasswordId =route.snapshot.params['resetPasswordId'];
    alert(this.resetPasswordId);
    this.loginService.checkAuthorization(this.resetPasswordId).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => console.log(error)
    );
   }

  ngOnInit() {
    
  }
  redirectTo(){
    if(this.msg=='true'){

    }else{
      this.router.navigate(['/']);    
    } 
  }
  setPassword(){
    this.resetPassword.resetpasswordId=this.resetPasswordId;
    this.resetPassword.user.password=this.password;
    this.loginService.updatePasswordUser(this.resetPassword).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => console.log(error)
    );
  }
  redirectTo1(){
    if(this.msg=='save'){
      alert("cambio exitoso")
      this.router.navigate(['/']);   
    }else{
      alert("algo salio mal vuelva a intentarlo o comuniquese con nuestro equipo de soporte.")
    } 
  }

}
