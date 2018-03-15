import { Component, OnInit } from '@angular/core';
import { Claim } from '../../model/claim';
import { user } from '../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  claimId: number;
  User:user=new user();
  claim:Claim=new Claim();
  change:boolean=false;
  back:boolean=false;
  misuse:boolean=false;
  afterBack:boolean=false;
  afterChange:boolean=false;
  popup:boolean=true;
  popup2:boolean=true;
  constructor(private route:ActivatedRoute, private router: Router,private claimService:ClaimService) { 
    this.claimId =route.snapshot.params['claimId'];
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
  }
  ngOnInit() {
    this.claimService.getClaimById(this.claimId,this.User).subscribe(
			res => {
            if(JSON.parse(JSON.stringify(res))._body==""){
              this.router.navigate(['/']); 
            }else{
              this.claim = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              console.log(JSON.stringify(this.claim));
            }
      		},
      		error => console.log(error)
    );

  }
  sendCodeChange(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=false;
    this.popup=false;
    this.popup2=true;
    this.claim.back=false;
    this.claim.change=true;
    this.claim.minuse=false;
  }
  sendCodeBack(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=false;
    this.popup=false;
    this.popup2=true;
    this.claim.back=true;
    this.claim.change=false;
    this.claim.minuse=false;
  }
  sendCodeMisuse(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=false;
    this.popup=false;
    this.popup2=true;
    this.claim.back=false;
    this.claim.change=false;
    this.claim.minuse=true;
  }
  showAfterChange(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=!this.afterChange;
    this.popup=true;
    this.popup2=true;
  }
  showAfterBack(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=!this.afterBack;
    this.afterChange=false;
    this.popup=true;
    this.popup2=true;
  }
  cancelAgreement(){
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=false;
    this.popup=true;
    this.popup2=true;
  }
  sendAgreement(){
    this.popup2=false;
    this.change=false;
    this.back=false;
    this.misuse=false;
    this.afterBack=false;
    this.afterChange=false;
    this.popup=true;
    this.claim.back=false;
    this.claim.change=false;
    this.claim.minuse=false;
    alert(JSON.stringify(this.claim));
  }
}
