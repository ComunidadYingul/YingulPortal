export class Exterior {
    private exteriorId:number;
    private name:string;

	public get $exteriorId(): number {
		return this.exteriorId;
	}

	public set $exteriorId(value: number) {
		this.exteriorId = value;
	}



	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    

	
    
}