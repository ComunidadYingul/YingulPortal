import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../../../model/user';
import { PaymentService } from '../../../service/payment.service';
import { Payment } from '../../../model/payment';
@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  paymentId: number;
  User:user=new user();
  payment:Payment= new Payment();
  constructor(private route:ActivatedRoute,private router: Router, private paymentService:PaymentService) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
    this.paymentId =route.snapshot.params['paymentId'];
  }

  ngOnInit() {
    this.paymentService.getPaymentById(this.paymentId,this.User).subscribe(
			res => {
            if(JSON.parse(JSON.stringify(res))._body==""){
              this.router.navigate(['/']); 
            }else{
              this.payment = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            }
      		},
      		error => console.log(error)
    );
  }
}
