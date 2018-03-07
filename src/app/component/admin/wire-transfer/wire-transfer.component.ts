import { Component, OnInit } from '@angular/core';
import { WireTransfer } from '../../../model/wire-transfer';
import { WireTransferService } from '../../../service/wire-transfer.service';
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-wire-transfer',
  templateUrl: './wire-transfer.component.html',
  styleUrls: ['./wire-transfer.component.css']
})
export class WireTransferComponent implements OnInit {
  User: user=new user();
  toDoList:WireTransfer[];
  completeList:WireTransfer[];
  allList:WireTransfer[];
  msg:string;
  isAdmin:string;
  constructor(private wireTransferService:WireTransferService,private router: Router, private adminService:AdminService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.adminService.isAdmin(this.User).subscribe(
        res => {
              this.isAdmin = JSON.parse(JSON.stringify(res))._body;
              if(this.isAdmin=="true"){
              }else{
                this.router.navigate(['/']); 
              } 
            },
            error => console.log(error)
      )
    }
  }

  ngOnInit() {
    this.wireTransferService.getAllWireTransfer().subscribe(
			res => {
            this.allList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    this.wireTransferService.getToDoWireTransfer().subscribe(
			res => {
            this.toDoList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    this.wireTransferService.getCompleteWireTransfer().subscribe(
			res => {
            this.completeList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  onComplete(wireTransferId:number){
    this.wireTransferService.updateWireTransfer(wireTransferId).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
            this.ngOnInit();
          },
          error => console.log(error)
    )
  }
  redirectTo(){
    if(this.msg=='save'){

    }else{
      alert("Algo salio mal vuelve a intentarlo");
    } 
  }
}
