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
  constructor(private aboutService:AboutService) { }

  ngOnInit() {
  }
  sendMessage(){
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
          },
          error => console.log(error)
    )
  }
  redirectTo(){
    if(this.msg=='save'){
      alert("mensaje enviado exitosamente, nos pondremos en contacto lo mas pronto posible");
    }else{
      alert("Algo salio mal vuelve a intentarlo");
    } 
  }

}
