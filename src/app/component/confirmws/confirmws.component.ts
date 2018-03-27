import { Component, OnInit } from '@angular/core';
import { Confirm } from '../../model/confirm';
import { user } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../service/confirm.service';

@Component({
  selector: 'app-confirmws',
  templateUrl: './confirmws.component.html',
  styleUrls: ['./confirmws.component.css']
})
export class ConfirmwsComponent implements OnInit {
  confirmId: number;
  enabled:boolean=false;
  codeConfirm:number;
  confirm:Confirm=new Confirm();
  User:user=new user();
  msg:string;
  popup:boolean=true;
  number
  constructor(private route:ActivatedRoute, private confirmService:ConfirmService,private router: Router) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}

    this.confirmId =route.snapshot.params['confirmId'];
    this.confirmService.getConfirm(this.confirmId).subscribe(
			res => {
            if(JSON.parse(JSON.stringify(res))._body==""){
              this.router.navigate(['/']); 
            }else{
              this.confirm = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            }
      		},
      		error => console.log(error)
    );
   }

  ngOnInit() {
  }
  resolved(captchaResponse:string){
    if(this.codeConfirm!=null){
      this.enabled=true;
    }
  }
  onConfirm(){
    this.popup=false;
    this.confirm.codeConfirm=this.codeConfirm;
    this.confirm.buy=null;
    this.confirm.buyer=null;
    this.confirm.seller=null;
    console.log("confirm:"+JSON.stringify(this.confirm));
    ;
    this.confirmService.updateConfirm(this.confirm).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => console.log(error)
    );
  }
  redirectTo(){
    this.popup=true;
    if(this.msg=='save'){
      alert("Confirmación de entrega realizada exitosamente revise su bandeja de entrada");
      this.router.navigate(['/']);   
    }else{
      alert(this.msg);
    } 
  }
  changeInput(){
    this.enabled=false;
  }
  getconfirmCod(){

  }
  getconfirmApi(){
    this.confirmId
    this.confirmService.updateConfirmApi(this.confirm).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => console.log(error)
    );
  }
}
