import { Component, OnInit, ElementRef } from '@angular/core';
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { Person } from '../../../model/person';
import { LoginService } from '../../../service/login.service';
import { Network } from '../../../model/Network';
import { DomSanitizer,SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
import { Business } from '../../../model/business';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  User: user=new user();
  newUser : user = new user();
  person:Person= new Person();
  business:Business = new Business();
  BUCKET_URL:string=Network.BUCKET_URL;
  video:SafeUrl=null;
  popup:boolean=true;
  popup1:boolean=true;
  popup2:boolean=true;
  popup3:boolean=true;
  popup4:boolean=true;
  popup5:boolean=true;
  popup6:boolean=true;
  popup7:boolean=true;
  popup8:boolean=true;
  popup9:boolean=true;
  popup10:boolean=true;
  popup11:boolean=true;
  popup12:boolean=true;
  popup13:boolean=true;
  popup14:boolean=true;
  popup_g:boolean=true;
  username:string="";
  msg:string;
  passwordValited:string="";
  email:string="";
  email2:string="";
  password:string="";
  password2:string="";
  phone:string="";
  phone2:string="";
  video1:string="";
  businessName:string="";
  documentNumber:string="";
  userDocumentNumber:string="";
  userDocumentType:string="DNI";
  constructor(private router: Router, private userService:UserService, private loginService: LoginService,public sanitizer: DomSanitizer,private elem:ElementRef) {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
    this.getPerson();
  }
  getPerson(){
    this.userService.getPerson(this.User.username).subscribe(
			res => {
            this.person = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(this.person.business){
              this.getBusiness();
            }
            this.video=this.sanitizer.bypassSecurityTrustResourceUrl(this.person.yng_User.profileVideo);
            console.log(JSON.stringify(this.video));
            this.phone=this.person.yng_User.phone;
            this.phone2=this.person.yng_User.phone2;

      		},
      		error => console.log(error)
    );
  }
  getBusiness(){
    this.userService.getBusiness(this.User.username).subscribe(
			res => {
            this.business = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getDniCuit(type : string){
    console.log("type:"+type);
    if(type=="2"){this.userDocumentType="CUIT";}
    else{this.userDocumentType="DNI";}
  }
  updateUsername(){
    this.popup_g=false;
    this.popup=false;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updatePassword(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=false;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updateEmail(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=false;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  setPhone(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=false;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  setPhone2(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=false;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  setUserDocument(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=false;
  }
  updatePhone(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=false;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updatePhones(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=false;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updateBanner(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=false;
    this.popup13=true;
    this.popup14=true;
  }
  updteImage(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=false;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updateVideo(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=false;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updateBusinessName(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=false;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  updateUserDocument(){
    this.popup_g=false;
    this.popup=true;
    this.popup1=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=false;
    this.popup14=true;
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
  popupHide(){
    this.popup_g=true;
    this.ngOnInit();
  }
  process(){
    this.popup_g=false;
    this.popup2=false;

    this.popup=true;
    this.popup1=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  confirm(){
    this.popup_g=false;
    this.popup2=true;

    this.popup=true;
    this.popup1=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=false;
    this.popup8=true;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  confirmEmail(){
    this.popup_g=false;
    this.popup2=true;

    this.popup=true;
    this.popup1=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=false;
    this.popup9=true;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  confirmPassword(){
    this.popup_g=false;
    this.popup2=true;

    this.popup=true;
    this.popup1=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=false;
    this.popup10=true;
    this.popup11=true;
    this.popup12=true;
    this.popup13=true;
    this.popup14=true;
  }
  sendUsername(){
    this.process();
    this.newUser.username=this.username.trim();
    this.newUser.password=this.passwordValited.trim();
    this.userService.updateUsername(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendEmail(){
    this.process();
    this.newUser.email=this.email.trim();
    this.newUser.password=this.passwordValited.trim();
    this.userService.updateEmail(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendPassword(){
    this.process();
    this.newUser.password=this.password.trim()+":"+this.passwordValited.trim();
    this.userService.updatePassword(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo2();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendBusinessName(){
    this.process();
    this.business.businessName=this.businessName;
    this.business.user=null;
    this.userService.updateBusinessName(this.business,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendUserDocument(){
    this.process();
    this.newUser.documentNumber=this.userDocumentNumber;
    this.newUser.documentType=this.userDocumentType;
    this.userService.updateUserDocument(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendDocumentNumber(){
    this.process();
    this.business.documentNumber=this.documentNumber;
    this.business.documentType="CUIT";
    this.business.user=null;
    this.userService.updateBusinessDocumentNumber(this.business,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendPhones(){
    this.process();
    this.newUser.phone=this.phone.trim();
    this.newUser.phone2=this.phone2.trim();
    this.userService.updatePhones(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendPhone(){
    this.process();
    this.newUser.phone=this.phone.trim();
    this.userService.updatePhone(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendVideo(){
    this.process();
    this.newUser.profileVideo=this.video1;
    this.userService.updateVideo(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  setProfilePhoto(data:object){
    this.newUser.profilePhoto=JSON.stringify(data);
    this.newUser.profilePhoto=this.newUser.profilePhoto.replace(/['"]+/g, '');
    this.userService.updateProfilePhoto(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            if(this.msg=="save"){
              alert("Datos cambiados exitosamente!")
              location.reload();
            }else{
              alert(this.msg);
            }
          },
          error => {
            console.log(error);
          }
    );
  }
  setProfileBanner(data:object){
    this.newUser.profileBanner=JSON.stringify(data);
    this.newUser.profileBanner=this.newUser.profileBanner.replace(/['"]+/g, '');
    this.userService.updateProfileBanner(this.newUser,this.User).subscribe(
      res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            this.redirectTo1();
          },
          error => {
            console.log(error);
          }
    );
  }
  sendProfilePhoto(){
    this.process();
    this.uploadImage();
  }
  sendProfileBanner(){
    this.process();
    this.uploadImage1();
  }
  public uploadImage():void{
    let files = this.elem.nativeElement.querySelector('#image-upload1').files;
    let file = files[0];
    if(file!=null){
      this.getBase64(file).then(
        data => this.setProfilePhoto(data)
      );
    }
    else{
    }
  }
  public uploadImage1():void{
    let files2 = this.elem.nativeElement.querySelector('#image-upload2').files;
    let file2 = files2[0];
    if(file2!=null){
      this.getBase64(file2).then(
        data => this.setProfileBanner(data)
      );
    }
    else{
    }
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("Cambio de USERNAME exitoso!");
      this.User.username=this.newUser.username;
      this.User.password = btoa(this.newUser.username+":"+this.newUser.password);
      this.saveLocalStorage();
      this.User=JSON.parse(localStorage.getItem("user"));
      //this.ngOnInit(); BUSCAR LA FOMRA DE QUE NO SE ACTUALICE LA PAGINA SI NO ES NECESARIO
      location.reload();
    }else{
      alert(this.msg);
    }
    this.popup_g=true;
  }
  redirectTo1(){
    if(this.msg=='save'){
      alert("Datos cambiados exitosamente!");
      this.ngOnInit();
    }else{
      alert(this.msg);
    }
    this.popup_g=true;
  }
  redirectTo2(){
    if(this.msg=='save'){
      alert("Cambio de CLAVE exitoso!");
      this.User.password = btoa(this.User.username+":"+this.password.trim());
      this.saveLocalStorage();
      this.User=JSON.parse(localStorage.getItem("user"));

      this.ngOnInit();
    }else{
      alert(this.msg);
    }
    this.popup_g=true;
  }
  saveLocalStorage(){
    let User :user = this.User;
    localStorage.setItem("user", JSON.stringify(User));

  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  keyPressEmail(event: any) {
    const patron = /[a-z0-9@.\-_]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patron.test(inputChar)) {
      event.preventDefault();
    }
  }
}
