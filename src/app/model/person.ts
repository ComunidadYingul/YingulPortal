import { user } from './user';
export class Person {
    private person_id : number;
    is_business : boolean;
    lastname : string;
    name : string;
    //si no quiere registrar poner aqui new user();
    yng_User : user=new user();
    constructor() {
	}
    createPerson(name:string, lastname:string, email:string, password:string){
        this.name= name;
        this.lastname= lastname;
        this.yng_User.$email = email;
        this.yng_User.$password= password;
        this.is_business= false;
    }

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

	public get $lastname(): string {
		return this.lastname;
	}

	public set $lastname(value: string) {
		this.lastname = value;
	}

	public get $person_id(): number {
		return this.person_id;
	}

	public set $person_id(value: number) {
		this.person_id = value;
	}

	public get $is_business(): boolean {
		return this.is_business;
	}

	public set $is_business(value: boolean) {
		this.is_business = value;
	}

	public get $yng_User(): user {
		return this.yng_User;
	}

	public set $yng_User(value: user) {
		this.yng_User = value;
	}
    
}
