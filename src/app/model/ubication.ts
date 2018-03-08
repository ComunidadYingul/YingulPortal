import { Province } from './province';
import { City } from './city';
import { Barrio } from './barrio';
import { Country } from './country';
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
    yng_Country:Country = new Country();	
}
