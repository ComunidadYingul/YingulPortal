import { Component, OnInit } from '@angular/core';
import { Buy } from '../../../model/buy';
import { user } from '../../../model/user';
import { BuyService } from '../../../service/buy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  listSales:Buy[];
  User: user=new user();
  constructor(private router: Router, private buyService:BuyService) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
    this.buyService.getSalesForUser(this.User.username).subscribe(
			res => {
              this.listSales = JSON.parse(JSON.parse(JSON.stringify(res))._body);   
      		},
      		error => console.log(error)
    );
  }

}