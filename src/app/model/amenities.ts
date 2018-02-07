export class Amenities {
    private amenities_id:number;
    private name:string;

	public get $amenities_id(): number {
		return this.amenities_id;
	}

	public set $amenities_id(value: number) {
		this.amenities_id = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

}