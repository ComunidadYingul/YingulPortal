export class Confort {
    private confortId:number;
    private name:string;

	public get $confortId(): number {
		return this.confortId;
	}

	public set $confortId(value: number) {
		this.confortId = value;
    }

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    

	
    
}