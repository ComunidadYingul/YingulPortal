import { Component, OnInit } from '@angular/core';
import { Store } from '../../model/store';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';
import { user } from '../../model/user';
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
  popup_g:boolean=true;
  User: user=new user();
  constructor(private storeService: StoreService, private router: Router) { 
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
    } else {
      this.User=JSON.parse(localStorage.getItem("user"));
    }
  }
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
    this.popup_g=false;
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
