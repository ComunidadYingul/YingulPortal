export class ListCreditCard {
    private listCreditCardId:number;
    private name:string;

	public get $listCreditCardId(): number {
		return this.listCreditCardId;
	}

	public set $listCreditCardId(value: number) {
		this.listCreditCardId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}
    
}
