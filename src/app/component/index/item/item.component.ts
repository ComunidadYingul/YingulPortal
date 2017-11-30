import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../service/index.service'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemList: Object[]=[];
  constructor(private indexService: IndexService) {
    this.getItems();
   }

  ngOnInit() {
  }
  getItems() {
    this.indexService.getItems().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
  }

}
