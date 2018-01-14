export class CardProvider {
    private cardProviderId:number;
    private name:string;

	public get $cardProviderId(): number {
		return this.cardProviderId;
	}

	public set $cardProviderId(value: number) {
		this.cardProviderId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    
}
