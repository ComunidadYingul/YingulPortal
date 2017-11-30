import { Item } from './item';
import { Province } from './province';
export class Property{
    private propertyId:number;
	private propertyTotalArea:string;
	private propertyDuildedArea:string;
    private propertyYear:string;
    //private propertyBath:string;
    //private productPaymentMethod:string;
	//private propertyGarages:string;
    //private productPagoEnvio:string;
    private yng_Item:Item =new Item();

	public get $propertyId(): number {
		return this.propertyId;
	}

	public set $propertyId(value: number) {
		this.propertyId = value;
	}

	public get $propertyTotalArea(): string {
		return this.propertyTotalArea;
	}

	public set $propertyTotalArea(value: string) {
		this.propertyTotalArea = value;
	}

	public get $propertyDuildedArea(): string {
		return this.propertyDuildedArea;
	}

	public set $propertyDuildedArea(value: string) {
		this.propertyDuildedArea = value;
	}

	public get $propertyYear(): string {
		return this.propertyYear;
	}

	public set $propertyYear(value: string) {
		this.propertyYear = value;
    }
    

	public get $yng_Item(): Item  {
		return this.yng_Item;
	}

	public set $yng_Item(value: Item ) {
		this.yng_Item = value;
    }
}