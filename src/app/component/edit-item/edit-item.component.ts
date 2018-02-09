import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../service/item-detail.service';
import { Item } from '../../model/item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  public itemId: number;
  public Item:Item=new Item();

  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService) { 
    this.itemId =route.snapshot.params['itemId'];
    console.log("this.itemId:"+this.itemId);
  }

  ngOnInit() {
    this.getItemById();
  }
  getItemById(){
    this.itemDetailService.getItemById(this.itemId).subscribe(
			res => {
            this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            //console.log(JSON.stringify(this.Item));
        },
      		error => console.log(error)
    );
    
  }

}
