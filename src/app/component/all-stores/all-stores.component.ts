import { Component, OnInit } from '@angular/core';
import { Store } from '../../model/store';
import { StoreService } from '../../service/store.service';
import { Network } from '../../model/Network';
@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css']
})
export class AllStoresComponent implements OnInit {
  storeList : Store[];
  BUCKET_URL:string=Network.BUCKET_URL;
  constructor(private storeService : StoreService) { }

  ngOnInit() {
    this.storeService.findAll().subscribe(
			res => {
            this.storeList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.storeList));     
      		},
      		error => console.log(error)
    );
  }

}
