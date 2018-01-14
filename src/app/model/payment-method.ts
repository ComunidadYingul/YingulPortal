import { Card } from './card';
export class PaymentMethod {
    private paymentMethodId:number;
    private name:string;
    private type:string;
    private paymentPlan:string;
    private yng_Card:Card=new Card();

	public get $paymentMethodId(): number {
		return this.paymentMethodId;
	}

	public set $paymentMethodId(value: number) {
		this.paymentMethodId = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

	public get $type(): string {
		return this.type;
	}

	public set $type(value: string) {
		this.type = value;
	}

	public get $paymentPlan(): string {
		return this.paymentPlan;
	}

	public set $paymentPlan(value: string) {
		this.paymentPlan = value;
	}

	public get $yng_Card(): Card {
		return this.yng_Card;
	}

	public set $yng_Card(value: Card) {
		this.yng_Card = value;
	}
    
}
