import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CategoryService } from '../../service/category.service';
import { QueryServiceService } from '../../service/query-service.service';
import { Router } from '@angular/router';
import { user } from '../../model/user';
import { Email } from '../../model/email';
import { AboutService } from '../../service/about.service';
import { Network } from '../../model/Network';
import { UserService } from '../../service/user.service';
import { Person } from '../../model/person';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	BUCKET_URL:string=Network.BUCKET_URL;
	@Output() Menu = new EventEmitter();
	loggedIn: boolean=false;
	User: user=new user();
	person:Person= new Person();
	queries:number=0;
	categories:Object[];
	search;

	fullName:string="";
	email:string="";
	phone:string="";
	message:string="";
	sendEmail:Email=new Email();
	msg:string;

	hidName:boolean=true;
	hidEmail:boolean=true;
	hidPhone:boolean=true;
	hidMessage:boolean=true;
	hidEmailVal:boolean=true;
	popup_g:boolean=true;

	profilePhoto:string="";
	constructor(private loginService: LoginService, private router : Router,private queryService : QueryServiceService, private categoryService:CategoryService,private aboutService:AboutService, private userService:UserService) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.loggedIn = false;
			this.User = new user();
		
		} else {
			this.loggedIn = true;
			this.User=JSON.parse(localStorage.getItem("user"));
			this.getQueries();
			this.getProfilePhoto();
			this.getPerson();
		}
	}

	logout(){
		localStorage.setItem('user', '');
		localStorage.removeItem('user');
		this.loginService.logout().subscribe(
			res => {
				localStorage.setItem('user', '');
				localStorage.removeItem('user');
			},
			err => console.log(err)
			);
		location.reload();
		//this.router.navigate(['/login']);
	}

	getDisplay() {
    if(!this.loggedIn){
      return "none";
    } else {
      return "";
    }
  }

  ngOnInit() {
		
  }

	menu(){
    this.Menu.emit('menu');
	}
	getQueries(){
		this.queryService.getQueriesByUser(this.User.username).subscribe(
			res => {
            this.queries = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
		);
	
	}
	getProfilePhoto(){
		this.userService.getProfilePhoto(this.User).subscribe(
			res => {
				  this.profilePhoto = JSON.parse(JSON.stringify(res))._body;
				},
				error => {
				  console.log(error);
				}
		  );
	}
	onSearchChange(name) {
		if(name!=""){
			this.categoryService.getCategoriesByNane(name).subscribe(
			res => {
						this.categories = JSON.parse(JSON.parse(JSON.stringify(res))._body);
						for (var i = 0; i < this.categories.length; i++) {
							if (JSON.parse(JSON.stringify(this.categories[i])).name === name) {
							  this.router.navigateByUrl('/itemsCategory/'+JSON.parse(JSON.stringify(this.categories[i])).categoryId);
							  location.reload();
							  break;
							}
					  	}	
				},
				error => console.log(error)
			);
		}

		
	}
	bestMatch(){
		if(this.search!=""){
			this.categoryService.getBestMatch(this.search).subscribe(
			res => {
						let url = JSON.parse(JSON.stringify(res))._body;
						this.router.navigate(['/itemsCategory'+url]); 
						location.reload();  
				},
				error => console.log(error)
			);
		}
	}

	sendMessage(){
		this.reset();
    	var patron = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
		if(this.fullName==null || this.fullName==""){
			this.hidName=false;
		}else if(this.email==null || this.email==""){
			this.hidEmail=false;
		}else if(this.phone==null || this.phone==""){
			this.hidPhone=false;
		}else if(this.message==null || this.message==""){
			this.hidMessage=false;
		}else if(!patron.test(this.email)){
			this.hidEmailVal=false;
		}
		else{
			this.reset();
			this.popup_g=false;
			this.sendEmail.sentFrom=this.email;
			this.sendEmail.sendTo="yingul@internetvale.com";
			this.sendEmail.title="Consulta Urgente";
			this.sendEmail.body=this.fullName+" pregunto: "+this.message+" en la seccion de contactanos de yingul.com" 
			+" se debe dar el soporte correspondiente su datos de contacto son: "
			+"correo: "+this.email+" teléfono: "+this.phone;
			this.aboutService.createMail(this.sendEmail).subscribe(
			res => {
					this.msg = JSON.parse(JSON.stringify(res))._body;
					this.redirectTo();
					this.popup_g=true;
				},
				error => {
					console.log(error)
					this.popup_g=true;
				}
			);
		}
	}
	redirectTo(){
		if(this.msg=='save'){
			alert("mensaje enviado exitosamente, nos pondremos en contacto lo mas pronto posible");
		}else{
			alert("Algo salio mal vuelve a intentarlo");
		} 
		this.fullName="";
		this.email="";
		this.phone="";
		this.message="";
	}
	handleKeyDown(event: any){
    	if (event.keyCode == 13){
			this.bestMatch();
    	}  
	}
	reset(){
		this.hidName=true;
		this.hidEmail=true;
		this.hidPhone=true;
		this.hidMessage=true;
	  }
	  keyPressEmail(event: any) {
		const patron = /[a-z0-9@.\-_]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !patron.test(inputChar)) {
		  event.preventDefault();
		}
	}
	getPerson(){
		this.userService.getPerson(this.User.username).subscribe(
			res => {
				this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
			},
				error => console.log(error)
		);
		
	}
}

