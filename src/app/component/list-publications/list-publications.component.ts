import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from '../../service/item-detail.service';
import { user } from '../../model/user';
import { Network } from '../../model/Network';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.css']
})
export class ListPublicationsComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  itemsBySeller: Object[]=[];
  useri:user=new user();
  userNameP:string;
  deleteList:number[]=[];
  constructor(private itemDetailService : ItemDetailService) {

  }

  ngOnInit() {
   
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
  onConfirm(){}

}
