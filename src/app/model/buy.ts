import { user } from './user';
import { Item } from './item';
import { PaymentMethod } from './payment-method';
import { AndreaniEnvios } from './andreaniEnvios';
import { Shipping } from './shipping';
export class Buy {
	private buyId:number;
	private cost:number;
	private money:string;
	private quantity:number;
	private user:user=new user();
	private yng_item:Item= new Item();
	private yng_PaymentMethod:PaymentMethod= new PaymentMethod();
	private shipping:Shipping=new Shipping();


	public get $shipping(): Shipping {
		return this.shipping;
	}

	public set $shipping(value: Shipping) {
		this.shipping = value;
	}

	
/*
	private yng_envio:AndreaniEnvios =new AndreaniEnvios();

	public get $yng_envio(): AndreaniEnvios  {
		return this.yng_envio;
	}

	public set $yng_envio(value: AndreaniEnvios ) {
		this.yng_envio = value;
	}
*/

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
