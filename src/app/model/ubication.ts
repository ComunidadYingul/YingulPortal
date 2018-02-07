import { Province } from './province';
import { City } from './city';
import { Barrio } from './barrio';
export class Ubication {
    private ubication_id:number;
    latitud:string;
    longitud:string;
    street:string;
    number:string;
    postalCode:string;
	aditional:string;
	public codAndreani:string;
	
    yng_Province:Province= new Province();
    yng_City:City = new City();
	yng_Barrio:Barrio = new Barrio();
	

	public get $codAndreani(): string {
		return this.codAndreani;
	}

	public set $codAndreani(value: string) {
		this.codAndreani = value;
	}
	



	public get $ubication_id(): number {
		return this.ubication_id;
	}

	public set $ubication_id(value: number) {
		this.ubication_id = value;
	}

	public get $latitud(): string {
		return this.latitud;
	}

	public set $latitud(value: string) {
		this.latitud = value;
	}

	public get $longitud(): string {
		return this.longitud;
	}

	public set $longitud(value: string) {
		this.longitud = value;
	}

	public get $street(): string {
		return this.street;
	}

	public set $street(value: string) {
		this.street = value;
	}

	public get $number(): string {
		return this.number;
	}

	public set $number(value: string) {
		this.number = value;
	}

	public get $postalCode(): string {
		return this.postalCode;
	}

	public set $postalCode(value: string) {
		this.postalCode = value;
	}

	public get $aditional(): string {
		return this.aditional;
	}

	public set $aditional(value: string) {
		this.aditional = value;
	}

	public get $yng_Province(): Province {
		return this.yng_Province;
	}

	public set $yng_Province(value: Province) {
		this.yng_Province = value;
	}

	public get $yng_City(): City {
		return this.yng_City;
	}

	public set $yng_City(value: City) {
		this.yng_City = value;
	}

	public get $yng_Barrio(): Barrio {
		return this.yng_Barrio;
	}

	public set $yng_Barrio(value: Barrio) {
		this.yng_Barrio = value;
	}
    
}
