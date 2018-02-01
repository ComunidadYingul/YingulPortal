import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../service/store.service';
import { Store } from '../../model/store';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  nameStore:string;
  store:Store=new Store();
  constructor(private route:ActivatedRoute,private storeService : StoreService) {
    this.nameStore =route.snapshot.params['nameStore'];
    this.storeService.findStoreByName(this.nameStore).subscribe(
			res => {
            this.store = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.store));     
      		},
      		error => console.log(error)
    );
  }

  ngOnInit() {
    
  }
  

}
