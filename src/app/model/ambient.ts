export class Ambient {
    private ambient_id:number;
    private name:string;



	public get $ambient_id(): number {
		return this.ambient_id;
	}

	public set $ambient_id(value: number) {
		this.ambient_id = value;
	}



	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

}