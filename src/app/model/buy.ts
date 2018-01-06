import { user } from './user';
import { Item } from './item';
import { PaymentMethod } from './payment-method';
export class Buy {
	private buyId:number;
	private cost:number;
	private money:string;
	private quantity:number;
	private user:user=new user();
	private yng_item:Item= new Item();
	private yng_PaymentMethod:PaymentMethod= new PaymentMethod();

	public get $buyId(): number {
		return this.buyId;
	}

	public set $buyId(value: number) {
		this.buyId = value;
	}

	public get $cost(): number {
		return this.cost;
	}

	public set $cost(value: number) {
		this.cost = value;
	}

	public get $money(): string {
		return this.money;
	}

	public set $money(value: string) {
		this.money = value;
	}

	public get $quantity(): number {
		return this.quantity;
	}

	public set $quantity(value: number) {
		this.quantity = value;
	}
	
	public get $user(): user {
		return this.user;
	}

	public set $user(value: user) {
		this.user = value;
	}

	public get $yng_item(): Item {
		return this.yng_item;
	}

	public set $yng_item(value: Item) {
		this.yng_item = value;
	}

	public get $yng_PaymentMethod(): PaymentMethod {
		return this.yng_PaymentMethod;
	}

	public set $yng_PaymentMethod(value: PaymentMethod) {
		this.yng_PaymentMethod = value;
	}
	    
}
