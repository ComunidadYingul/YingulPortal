import { user } from './user';
export class Person {
    person_id : number;
    business : boolean;
    lastname : string;
    name : string;
    //si no quiere registrar poner aqui new user();
    yng_User : user=new user();
    constructor() {
	}
    createPerson(name:string, lastname:string, email:string, password:string,business:boolean){
        this.name= name;
        this.lastname= lastname;
        this.yng_User.email = email;
        this.yng_User.password= password;
        this.business= business;
    }
    
}
