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
          "slidesToShow": 4,
          "slidesToScroll": 3,
          "dots": true
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 2,
          "dots": true
        }
      },
      {
        "breakpoint": 992,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 2,
          "dots": true
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "dots": true
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "dots": true
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
