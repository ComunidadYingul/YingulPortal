import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../../service/favorite.service';
import { user } from '../../../model/user';
import { Favorite } from '../../../model/favorite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  User: user=new user();
  favoriteList: Favorite[];
  deleteList:number[]=[];
  msg:string;
  constructor(private favoriteService: FavoriteService,private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
			this.User=JSON.parse(localStorage.getItem("user"));
		}
    this.getFavorites();
  }
  getFavorites() {
    this.favoriteService.getFavorite(this.User.username).subscribe(
			res => {
            this.favoriteList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.favoriteList));
      		},
      		error => console.log(error)
    );
  }
  check(favoriteId:number){
    if(this.deleteList.indexOf(favoriteId)!=-1){
      this.deleteList.splice(this.deleteList.indexOf(favoriteId), 1);
    }else{
      this.deleteList.push(favoriteId);
    }
  }
  onConfirm(){
    this.favoriteService.deleteFavorites(this.deleteList).subscribe(
			res => {
        this.msg = JSON.parse(JSON.stringify(res))._body;
        this.redirectTo();
      },
      error => console.log(error)
    );
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("Eliminado de favoritos exitosamente");
      location.reload();
    }else{
      alert(this.msg);
    } 
  }
}
