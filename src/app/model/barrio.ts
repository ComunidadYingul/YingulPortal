import { City } from './city';
export class Barrio {
    private barrioId:number;
    name:string;
    //private city_id:City;
	public get $barrioId(): number {
		return this.barrioId;
	}

	public set $barrioId(value: number) {
		this.barrioId = value;
	}
	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    
}
