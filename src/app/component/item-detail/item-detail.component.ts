import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public itemId: number;
  constructor(private route:ActivatedRoute,private router: Router) { 
    this.itemId =route.snapshot.params['itemId'];
  }

  ngOnInit() {

    
  }
  

}
