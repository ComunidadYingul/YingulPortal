import { Component, OnInit } from '@angular/core';
import { user } from '../../../model/user';
import { ItemDetailService } from '../../../service/item-detail.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  itemsBySeller: Object[]=[];
  useri:user=new user();
  userNameP:string;
  deleteList:number[]=[];
  constructor(private itemDetailService : ItemDetailService) { }

  ngOnInit() {
    this.getItemsBySeller();
  }
  getItemsBySeller() {
    this.useri=JSON.parse(localStorage.getItem("user"));
    this.userNameP=this.useri.username;
    this.itemDetailService.getItemsBySeller(this.userNameP).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log("items:"+JSON.stringify(this.itemsBySeller));
      		},
      		error => console.log(error)
    );
    
  }
  onConfirm(){}
}
