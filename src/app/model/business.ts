
import { user } from './user';
export class Business{
businesId:number;
name:string;
socialName:string;
isBusiness :boolean;
typeContri:string;
address:string;

yng_User:user =new user();

	constructor() {

    }
    createBusiness(name:string, socialName:string, email:string, password:string,isBusiness:boolean,typeContri:string){
        this.name= name;
        this.socialName= socialName;
        this.yng_User.email = email;
		this.yng_User.password= password;
		
		this.isBusiness= isBusiness;
		this.typeContri=typeContri;

    }
    
}