
import { user } from './user';
export class Business{
private businesId:number;
private name:string;
private socialName:string;
private isBusiness :boolean;
private typeContri:string;
private address:string;

private yng_User:user =new user();



	public get $address(): string {
		return this.address;
	}

	public set $address(value: string) {
		this.address = value;
	}




	constructor() {

    }
    createBusiness(name:string, socialName:string, email:string, password:string,isBusiness:boolean,typeContri:string){
        this.name= name;
        this.socialName= socialName;
        this.yng_User.$email = email;
		this.yng_User.$password= password;
		
		this.isBusiness= isBusiness;
		this.typeContri=typeContri;

    }
    

	public get $businesId(): number {
		return this.businesId;
	}

	public set $businesId(value: number) {
		this.businesId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

	public get $socialName(): string {
		return this.socialName;
	}

	public set $socialName(value: string) {
		this.socialName = value;
	}

	public get $isBusiness(): boolean {
		return this.isBusiness;
	}

	public set $isBusiness(value: boolean) {
		this.isBusiness = value;
	}

	public get $typeContri(): string {
		return this.typeContri;
	}

	public set $typeContri(value: string) {
		this.typeContri = value;
	}
    



	public get $yng_User(): user  {
		return this.yng_User;
	}

	public set $yng_User(value: user ) {
		this.yng_User = value;
	}







}