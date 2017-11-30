import { Component, OnInit, Input} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SingupService } from '../../service/singup.service';
import { Router } from '@angular/router';
import { Person } from '../../model/person';

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
  regDis:boolean;

  constructor(private singupService: SingupService, private router: Router) { 
    this.regDis=false;
  }

  onSubmit(){
    this.regDis=true;
    this.person.createPerson(this.name, this.lastname,this.email,this.password);
    this.singupService.signUp(this.person).subscribe(
			res => {
            this.msg = JSON.parse(JSON.stringify(res))._body;
            if(this.msg=='save'){
              alert("registrado exitosamente revise su bandeja de entrada");
              this.router.navigate(['/']);   
            }
            else{
              alert(this.msg);
            } 
      		},
      		error => console.log(error)
    )
    this.regDis=false;
  }


  ngOnInit() {
  }

}
