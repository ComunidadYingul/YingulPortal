import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-category',
  templateUrl: './items-category.component.html',
  styleUrls: ['./items-category.component.css']
})
export class ItemsCategoryComponent implements OnInit {

  public categoryId: number;
  constructor(private route:ActivatedRoute,private router: Router) { 
    this.categoryId =route.snapshot.params['categoryId'];
  }

  ngOnInit() {
  }

}
