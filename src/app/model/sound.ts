export class Sound {
    private soundId:number;
    private name:string;


	public get $soundId(): number {
		return this.soundId;
	}

	public set $soundId(value: number) {
		this.soundId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    

	
    
}