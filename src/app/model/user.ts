import { Ubication } from './ubication';
export class user {
    private user_id : number;
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
	yng_Ubication:Ubication= new Ubication;


	public get $yng_Ubication(): Ubication {
		return this.yng_Ubication;
	}

	public set $yng_Ubication(value: Ubication) {
		this.yng_Ubication = value;
	}
	
	public get $country_id(): number {
		return this.country_id;
	}

	public set $country_id(value: number) {
		this.country_id = value;
	}

	public get $department_id(): number {
		return this.department_id;
	}

	public set $department_id(value: number) {
		this.department_id = value;
	}

	public get $province_id(): number {
		return this.province_id;
	}

	public set $province_id(value: number) {
		this.province_id = value;
	}

	public get $city_id(): number {
		return this.city_id;
	}

	public set $city_id(value: number) {
		this.city_id = value;
	}

	public get $username(): string {
		return this.username;
	}

	public set $username(value: string) {
		this.username = value;
	}


	public get $webSite(): string {
		return this.webSite;
	}

	public set $webSite(value: string) {
		this.webSite = value;
	}

	public get $optionalPhone(): string {
		return this.optionalPhone;
	}

	public set $optionalPhone(value: string) {
		this.optionalPhone = value;
	}

	public get $phone(): string {
		return this.phone;
	}

	public set $phone(value: string) {
		this.phone = value;
	}

	public get $enabled(): boolean {
		return this.enabled;
	}

	public set $enabled(value: boolean) {
		this.enabled = value;
	}

	public get $address(): string {
		return this.address;
	}

	public set $address(value: string) {
		this.address = value;
	}

	public get $user_id(): number {
		return this.user_id;
	}

	public set $user_id(value: number) {
		this.user_id = value;
	}

	public get $password(): string {
		return this.password;
	}

	public set $password(value: string) {
		this.password = value;
	}

	public get $email(): string {
		return this.email;
	}

	public set $email(value: string) {
		this.email = value;
	}

	public get $phone2(): string {
		return this.phone2;
	}

	public set $phone2(value: string) {
		this.phone2 = value;
	}
	
	
}