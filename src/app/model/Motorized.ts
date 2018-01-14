import { Item } from './item';
import { Province } from './province';
export class Motorized {

    //Motorized
    private motorized_id:number;
    private motorizedBrand: string;
    private motorizedYear: string;
    private motorizedModel: string;
    private motorizedUnicoDue: string;

    private motorizedDoor: string;
    private motorizedKilometers: string;
    private motorizedFuelType: string;
    private motorizedColor: string;
    private motorizedDirection: string;
    private motorizedTransmission: string;
    private motorizedTractionControl: string;
    private motorizedMotor: string;
    private motorizedType: string;

    private motorizedSecurity: Object[];
    private motorizedConfort: Object[];
    private motorizedSound: Object[];
    private motorizedExterior: Object[];
    private motorizedEquipment: Object[];

    private yng_Item: Item = new Item();

    public get $motorizedBrand(): string {
        return this.motorizedBrand;
    }

    public set $motorizedBrand(value: string) {
        this.motorizedBrand = value;
    }

    public get $motorizedYear(): string {
        return this.motorizedYear;
    }

    public set $motorizedYear(value: string) {
        this.motorizedYear = value;
    }

    public get $motorizedModel(): string {
        return this.motorizedModel;
    }

    public set $motorizedModel(value: string) {
        this.motorizedModel = value;
    }

    public get $motorizedUnicoDue(): string {
        return this.motorizedUnicoDue;
    }

    public set $motorizedUnicoDue(value: string) {
        this.motorizedUnicoDue = value;
    }

    public get $motorizedDoor(): string {
        return this.motorizedDoor;
    }

    public set $motorizedDoor(value: string) {
        this.motorizedDoor = value;
    }

    public get $motorizedKilometers(): string {
        return this.motorizedKilometers;
    }

    public set $motorizedKilometers(value: string) {
        this.motorizedKilometers = value;
    }


    public get $motorizedFuelType(): string {
        return this.motorizedFuelType;
    }

    public set $motorizedFuelType(value: string) {
        this.motorizedFuelType = value;
    }


    public get $motorizedColor(): string {
        return this.motorizedColor;
    }

    public set $motorizedColor(value: string) {
        this.motorizedColor = value;
    }


    public get $motorizedDirection(): string {
        return this.motorizedDirection;
    }

    public set $motorizedDirection(value: string) {
        this.motorizedDirection = value;
    }

	public get $motorizedTransmission(): string {
		return this.motorizedTransmission;
	}

	public set $motorizedTransmission(value: string) {
		this.motorizedTransmission = value;
	}

	public get $motorizedTractionControl(): string {
		return this.motorizedTractionControl;
	}

	public set $motorizedTractionControl(value: string) {
		this.motorizedTractionControl = value;
	}

	public get $motorizedMotor(): string {
		return this.motorizedMotor;
	}

	public set $motorizedMotor(value: string) {
		this.motorizedMotor = value;
	}

	public get $motorizedType(): string {
		return this.motorizedType;
	}

	public set $motorizedType(value: string) {
		this.motorizedType = value;
	}


	public get $yng_Item(): Item  {
		return this.yng_Item;
	}

	public set $yng_Item(value: Item ) {
		this.yng_Item = value;
    }
    


	public get $motorized_id(): number {
		return this.motorized_id;
	}

	public set $motorized_id(value: number) {
		this.motorized_id = value;
	}

	public get $motorizedSecurity(): Object[] {
		return this.motorizedSecurity;
	}

	public set $motorizedSecurity(value: Object[]) {
		this.motorizedSecurity = value;
	}

	public get $motorizedConfort(): Object[] {
		return this.motorizedConfort;
	}

	public set $motorizedConfort(value: Object[]) {
		this.motorizedConfort = value;
	}

	public get $motorizedSound(): Object[] {
		return this.motorizedSound;
	}

	public set $motorizedSound(value: Object[]) {
		this.motorizedSound = value;
	}

	public get $motorizedExterior(): Object[] {
		return this.motorizedExterior;
	}

	public set $motorizedExterior(value: Object[]) {
		this.motorizedExterior = value;
	}

	public get $motorizedEquipment(): Object[] {
		return this.motorizedEquipment;
	}

	public set $motorizedEquipment(value: Object[]) {
		this.motorizedEquipment = value;
	}
     
}