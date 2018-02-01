import { Component, OnInit } from '@angular/core';
import { Store } from '../../model/store';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {
  hidAbout:boolean=true;
  hidFront:boolean=false;
  store:Store;
  msg:string;
  popup2:boolean=true;
  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit() {
  }
  sendSetStore1(ev){
    if(ev!=null){
      this.store=ev;
      this.hidAbout=false;
      this.hidFront=true;
    }else{
      this.store=null;
      this.hidAbout=true;
      this.hidFront=false;
    }
  }
  sendSetStore(ev){
    if(ev!=null){
      this.store=ev;
      this.saveStore();
    }else{
      this.store=null;
      this.hidAbout=false;
      this.hidFront=true;
    }
  }
  saveStore(){
    this.popup2=false;
    this.store.user=JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(this.store));
    this.storeService.createStore(this.store).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
      		},
      		error => console.log(error)
    )
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("Tienda registrada exitosamente revise su bandeja de entrada");
      this.router.navigate(['/']);   
    }
    else{
      alert(this.msg);
      this.router.navigate(['/']);
    } 
  }
}
