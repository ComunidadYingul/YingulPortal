import { Component, OnInit } from '@angular/core';
import { BankService } from '../../../service/bank.service';
import { Bank } from '../../../model/bank';
import { Account } from '../../../model/account';
import { WireTransfer } from '../../../model/wire-transfer';
import { AccountService } from '../../../service/account.service';
import { WireTransferService } from '../../../service/wire-transfer.service';
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import { Transaction } from '../../../model/transaction';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  User: user=new user();
  listBank:Bank[];
  wireTransfer:WireTransfer= new WireTransfer();
  titularName:string;
  cuitCuil:string="CUIL";
  cuitCuilNumber:number;
  bankId:number=-1;
  accountType:string="opt1";
  cbu:number;
  amount:number;
  currency:string="ARS";
  account:Account=new Account();
  transaction:Transaction= new Transaction();
  dataForBuyer:Object=new Object();
  msg:string;
  popup2:boolean=true;
  isValid:boolean=false;
  constructor(private bankService:BankService, private accountService:AccountService,private router: Router, private wireTranserService:WireTransferService) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
   }

  ngOnInit() {
    this.bankService.getAll().subscribe(
			res => {
            this.listBank = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
      		},
      		error => console.log(error)
    ); 
    this.accountService.getAccountByUser(this.User.username).subscribe(
			res => {
            this.account = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
      		},
      		error => console.log(error)
    ); 
    this.wireTranserService.getDataForUser().subscribe(
			res => {
            this.dataForBuyer = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  transfer(){
    this.wireTransfer.titularName=this.titularName;
    this.wireTransfer.cuitCuil=this.cuitCuil;
    this.wireTransfer.cuitCuilNumber=this.cuitCuilNumber;
    this.wireTransfer.bank.bankId=this.bankId;
    this.wireTransfer.accountType=this.accountType;
    this.wireTransfer.cbu=this.cbu;
    this.wireTransfer.amount=this.amount;
    this.wireTransfer.currency=this.currency;

    this.transaction.account=this.account;
    this.transaction.amount=this.amount;
    this.transaction.currency="ARS";
    this.transaction.ip=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).query));
    this.transaction.org=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).org));
    this.transaction.lat=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).lat));
    this.transaction.lon=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).lon));
    this.transaction.city=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).city));
    this.transaction.country=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).country));
    this.transaction.countryCode=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).countryCode));
    this.transaction.regionName=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).regionName));
    this.transaction.zip=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataForBuyer)).zip));

    this.wireTransfer.transaction=this.transaction;
    this.wireTransfer.transaction.account.user=null;    
    this.wireTranserService.createWireTransfer(this.wireTransfer).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => console.log(error)
    )
    console.log(JSON.stringify(this.wireTransfer));
  }
  redirectTo(){
    this.popup2=false;
    if(this.msg=='save'){
      alert("Transferencia realizada exitosamente revise su bandeja de entrada");
      this.router.navigate(['/']);   
    }else{
      alert(this.msg);
    } 
  }
  isValidForm() {
    if(this.titularName!="" && this.cuitCuilNumber>0 && this.bankId>-1 && this.accountType!="opt1" && this.cbu>0 && this.amount<this.account.availableMoney && this.amount>3){
      this.isValid=true;
    }else{
      this.isValid=false;
    }
    return this.isValid;
  }
}