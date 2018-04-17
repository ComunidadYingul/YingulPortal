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
    "typeSlide":"store",
    "anchoSlide":560,
    //"dots": true,
    "infinite": false,
    //"speed": 350,
    //"slidesToShow": 2,
    "slidesToScroll": 3,
    //"autoplay": true,
    //"autoplaySpeed": 2000,
    "responsive": [
      {
        "breakpoint": 320,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 640,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 800,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 960,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 3,
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 1440,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 1680,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 5,
        }
      },
      {
        "breakpoint": 1920,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 6,
        }
      },
      {
        "breakpoint": 2160,
        "settings": {
          "slidesToShow": 7,
          "slidesToScroll": 7,
        }
      },
      {
        "breakpoint": 2400,
        "settings": {
          "slidesToShow": 8,
          "slidesToScroll": 8,
        }
      },
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
