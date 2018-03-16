import { Component, OnInit } from '@angular/core';
import { Confirm } from '../../../model/confirm';
import { Router } from '@angular/router';
import { user } from '../../../model/user';
import { Claim } from '../../../model/claim';
import { ConfirmService } from '../../../service/confirm.service';
import { ClaimService } from '../../../service/claim.service';
import { Network } from '../../../model/Network';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  confirmList:Confirm[];
  User: user=new user();
  claim:Claim=new Claim();
  claimText:string;
  popup:boolean=true;
  popup2:boolean=true;
  msg:string;
  constructor(private router: Router, private confirmService:ConfirmService, private claimService:ClaimService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
    this.confirmService.getConfirmToClaimForUser(this.User.username).subscribe(
			res => {
              this.confirmList = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
      		},
      		error => console.log(error)
    );
  }
  initClaim(confirm:Confirm){
    this.claim.confirm=confirm;
    this.popup=false;
  }
  createClaim(){
    this.popup=true;
    this.popup2=false;
    this.claim.claimText=this.claimText;
    this.claim.confirm.seller=null;
    this.claim.confirm.buyer=null;
    this.claim.confirm.buy=null;
    this.claimService.saveClaim(this.claim).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
            this.ngOnInit();
          },
          error => console.log(error)
    )
  }
  isFormDisabled(){
    if(this.claimText==null || this.claimText.length<5){
      return true;
    }else{
      return false;
    }
  }
  popupHide(){
    this.popup=true;
  }
  redirectTo(){
    if(this.msg=='save'){

    }else{
      alert("Algo salio mal vuelve a intentarlo");
    } 
  }
}
