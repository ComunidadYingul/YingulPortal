import { Item } from "./item";
import { user } from "./user";
import { Branch } from "./branch";

export class Quote {
    quoteId:number;
	rate:number;
	rateOrigin:number;
	respuesta:string;	
	yng_Item:Item;
	yng_User:user;
	yng_Branch:Branch;
	quantity:number;
}