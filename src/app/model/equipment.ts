export class Equipment {
    private equipmentId:number;
    private name:string;

	public get $equipmentId(): number {
		return this.equipmentId;
	}

	public set $equipmentId(value: number) {
		this.equipmentId = value;
	}



	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    

	
    
}