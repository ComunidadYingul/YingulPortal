import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from '../../service/item-detail.service';
import { user } from '../../model/user';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.css']
})
export class ListPublicationsComponent implements OnInit {
  itemsBySeller: Object[]=[];
  useri:user=new user();
  userNameP:string;
  constructor(private itemDetailService : ItemDetailService) {
  }

  ngOnInit() {
    this.getItemsBySeller();
  }

  getItemsBySeller() {
    this.useri=JSON.parse(localStorage.getItem("user"));
    this.userNameP=this.useri.username;
    this.itemDetailService.getItemsBySeller(this.userNameP).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }
}
