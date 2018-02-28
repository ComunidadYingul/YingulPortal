import { user } from './user';
import { Item } from './item';
import { Payment } from './payment';
import { AndreaniEnvios } from './andreaniEnvios';
import { Shipping } from './shipping';
export class Buy {

	buyId:number;
	cost:number;
	shippingCost:number;
	itemCost:number;
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
	time:string;
	userAgent:string;
	cookie:string;
	deviceSessionId:string;
	user:user=new user();
	yng_item:Item= new Item();
	yng_Payment:Payment= new Payment();
	shipping:Shipping=new Shipping();
	    
}
