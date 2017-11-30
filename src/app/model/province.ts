export class Province {
    private provinceId:number;
    name:string;

	public get $provinceId(): number {
		return this.provinceId;
	}

	public set $provinceId(value: number) {
		this.provinceId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    
}
