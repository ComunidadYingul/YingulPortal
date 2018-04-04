import { Ubication } from './ubication';
export class user {
    user_id : number;
    address : string;
    email : string;
    enabled : boolean;
    password : string;
	phone : string;
	phone2 : string;
	optionalPhone: string;
	webSite:string;
    username : string;
    city_id : number;
    province_id : number;
    department_id : number;
	country_id : number;
	//modificar la ubicacion del usuario y crear la clase ubication
    yng_Ubication:Ubication= new Ubication();
    documentType:string;
    documentNumber:string
    authorities:Object[];
    profileBanner:string;
    profilePhoto:string;
    profileVideo:string;
    
}