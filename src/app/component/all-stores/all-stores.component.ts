import { Component, OnInit } from '@angular/core';
import { Store } from '../../model/store';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css']
})
export class AllStoresComponent implements OnInit {
  storeList : Store[];
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
