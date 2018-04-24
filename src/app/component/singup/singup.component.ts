import { Component, OnInit, Input} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SingupService } from '../../service/singup.service';
import { Router } from '@angular/router';
import { Person } from '../../model/person';
import {Business} from '../../model/business';
import { SellService } from '../../service/sell.service'
import { Province } from '../../model/province';
import { City } from '../../model/city';
import { Barrio } from '../../model/barrio';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  person: Person = new Person();
 
  name: string;
  lastname: string;
  email: string;
  password: string;
  msg: string;
  condition:boolean;
  business:boolean=false;

  hidName:boolean=true;
  hidLastname:boolean=true;
  hidEmail:boolean=true;
  hidPassword:boolean=true;
  popup_g:boolean=true;
  cbxPersona:boolean;

  constructor(private singupService: SingupService, private router: Router,private sellService: SellService) {   
    
  }
  ngOnInit() {

  }
  onSubmit(){
    this.regPerson();
  }
  regPerson(){
    this.reset();
    var patron = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if(this.name==null || this.name==""){
        this.hidName=false;
      }else if(this.lastname==null || this.lastname==""){
        this.hidLastname=false;
      }else if(this.email==null || this.email==""){
        this.hidEmail=false;
      }else if(this.password==null || this.password==""){
        this.hidPassword=false;
      }else if(this.cbxPersona!=true){
        alert('Debe aceptar los terminos y condiciones');
      }else if(!patron.test(this.email)){
        alert('Corre electronico no valido');
      }else{
        this.popup_g=false;

        this.person.createPerson(this.name, this.lastname,this.email,this.password,this.business);
        this.singupService.signUp(this.person).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg=='save'){
                  alert("registrado exitosamente revise su bandeja de entrada");
                  this.router.navigate(['/']);   
                }
                else{
                  this.popup_g=true;
                  alert(this.msg);
                } 
              },
              error => {
                this.popup_g=true;
                console.log(error)
              }
        );
      }
  }

  reset(){
    this.hidName=true;
    this.hidLastname=true;
    this.hidEmail=true;
    this.hidPassword=true;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  /*isFormDisabled(){
    if(this.condition==null||this.condition!=true||this.name==null||this.name.length==0||this.lastname==null || this.lastname.length==0||this.password==null||this.password.length==0||this.email==null){
      return true;
    }else{
      return false;
    }
  }*/
  keyPressEmail(event: any) {
    const patron = /[a-z0-9@.\-_]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patron.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressLetras(event: any){
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
