import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../service/about.service';
import { Email } from '../../../model/email';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  fullName:string="";
  email:string="";
  message:string="";
  direction:string="";
  phone:string="";
  twitterId:string="";
  skypeId:string="";
  webSite:string="";
  sendEmail:Email=new Email();
  msg:string;

  hidName:boolean=true;
  hidEmail:boolean=true;
  hidMessage:boolean=true;
  hidDirection:boolean=true;
  hidPhone:boolean=true;
  hidEmailVal:boolean=true;
  popup_g:boolean=true;

  constructor(private aboutService:AboutService) { }

  ngOnInit() {
  }
  sendMessage(){
    this.reset();
    var patron = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if(this.fullName==null || this.fullName==""){
      this.hidName=false;
    }else if(this.email==null || this.email==""){
      this.hidEmail=false;
    }else if(this.message==null || this.message==""){
      this.hidMessage=false;
    }else if(this.direction==null || this.direction==""){
      this.hidDirection=false;
    }else if(this.phone==null || this.phone==""){
      this.hidPhone=false;
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
      +"correo: "+this.email+" dirección "+this.direction+" teléfono: "+this.phone+" twitter: "+this.twitterId
      +" skype: "+this.skypeId+" sitio web: "+this.webSite;
      this.aboutService.createMail(this.sendEmail).subscribe(
        res => {
              this.msg = JSON.parse(JSON.stringify(res))._body;
              this.redirectTo();
              this.popup_g=true;
              this.reset();
            },
            error => {
              console.log(error);
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
    this.message="";
    this.direction="";
    this.phone="";
    this.twitterId="";
    this.skypeId="";
    this.webSite="";
  }
  reset(){
		this.hidName=true;
		this.hidEmail=true;
		this.hidPhone=true;
    this.hidMessage=true;
    this.hidDirection=true;
    this.hidEmailVal=true;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
