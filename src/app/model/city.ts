import { Province } from './province';
export class City {
    private cityId:number;
    name:string;
	//private 
	province_id:string;

	public get $cityId(): number {
		return this.cityId;
	}

	public set $cityId(value: number) {
		this.cityId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    
}
