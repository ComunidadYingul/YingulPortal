import { Item } from './item';
import { Province } from './province';
export class Service {
    private service_id:number;
    cobertureZone: Object[];
    yng_Item:Item =new Item();
	emailService : string;
	constructor() {
	}
    
	public get $service_id(): number {
		return this.service_id;
	}

	public set $service_id(value: number) {
		this.service_id = value;
	}

	public get $cobertureZone(): Object[] {
		return this.cobertureZone;
	}

	public set $cobertureZone(value: Object[]) {
		this.cobertureZone = value;
	}

	public get $yng_Item(): Item {
		return this.yng_Item;
	}


	public get $emailService(): string {
		return this.emailService;
	}

	public set $emailService(value: string) {
		this.emailService = value;
	}
	public set $yng_Item(value: Item) {
		this.yng_Item = value;
	}
    
}
