import { Item } from "./item";
import { user } from "./user";

export class Shipment {
	
    shipmentId:number;
	respuesta:string;
	typeMail:string="";
    yng_Item:Item;
    yng_User:user= new user();
    ticket:string="";
	//numero para realizar el seguimiento si lo tiene
    shipmentCod:string="";
}