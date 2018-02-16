import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../service/store.service';
import { Store } from '../../model/store';
import { ItemDetailService } from '../../service/item-detail.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  nameStore:string;
  store:Store=new Store();
  itemsBySeller: Object[]=[];
  video;
  constructor(private route:ActivatedRoute,private storeService : StoreService,private itemDetailService : ItemDetailService,public sanitizer: DomSanitizer) {
    this.nameStore =route.snapshot.params['nameStore'];
    this.storeService.findStoreByName(this.nameStore).subscribe(
			res => {
            this.store = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.store));     
            this.getItemsBySeller();
            this.video=this.sanitizer.bypassSecurityTrustResourceUrl(this.store.video);
      		},
      		error => console.log(error)
    );
  }

  ngOnInit() {
    
  }
  getItemsBySeller() {
    this.itemDetailService.getItemsBySeller(this.store.user.username).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }

}