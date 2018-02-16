import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmwos',
  templateUrl: './confirmwos.component.html',
  styleUrls: ['./confirmwos.component.css']
})
export class ConfirmwosComponent implements OnInit {
  confirmId: number;
  constructor(private route:ActivatedRoute) { 
    this.confirmId =route.snapshot.params['confirmId'];
    alert(this.confirmId);
  }

  ngOnInit() {
  }

}
