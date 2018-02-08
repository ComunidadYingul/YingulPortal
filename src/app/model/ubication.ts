import { Province } from './province';
import { City } from './city';
import { Barrio } from './barrio';
export class Ubication {
    ubication_id:number;
    latitud:string;
    longitud:string;
    street:string;
    number:string;
    postalCode:string;
	aditional:string;
	codAndreani:string;
	
    yng_Province:Province= new Province();
    yng_City:City = new City();
	yng_Barrio:Barrio = new Barrio();
	
}
