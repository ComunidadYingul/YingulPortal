import { Component, OnInit } from '@angular/core';
import { Store } from '../../../model/store';
import { StoreService } from '../../../service/store.service';
import { Network } from '../../../model/Network';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  storeList : Store[];
  BUCKET_URL:string=Network.BUCKET_URL;
  slideConfig={
    //"dots": true,
    "infinite": false,
    "speed": 300,
    "slidesToShow": 2,
    "slidesToScroll": 2,
    //"autoplay": true,
    //"autoplaySpeed": 2000,
    
    "responsive": [
      {
        "breakpoint": 1980,
        "settings": {
          "slidesToShow": 3.7,
          "slidesToScroll": 3,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 1367,
        "settings": {
          "slidesToShow": 2.7,
          "slidesToScroll": 2,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };
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
