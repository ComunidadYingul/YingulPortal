export class Security {
    private security_id:number;
    private desciption:string;
    private name:string;



	public get $security_id(): number {
		return this.security_id;
	}

	public set $security_id(value: number) {
		this.security_id = value;
	}

	public get $desciption(): string {
		return this.desciption;
	}

	public set $desciption(value: string) {
		this.desciption = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
}