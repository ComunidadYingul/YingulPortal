import { user } from './user';
import { Item } from './item';
import { PaymentMethod } from './payment-method';
import { AndreaniEnvios } from './andreaniEnvios';
import { Shipping } from './shipping';
export class Buy {

	buyId:number;
	cost:number;
	money:string;
	quantity:number;
	ip:string;
	org:string;
	lat:string;
	lon:string;
	city:string;
	country:string;
	countryCode:string;
	regionName:string;
	zip:string;
	user:user=new user();
	yng_item:Item= new Item();
	yng_PaymentMethod:PaymentMethod= new PaymentMethod();
	shipping:Shipping=new Shipping();
	    
}
