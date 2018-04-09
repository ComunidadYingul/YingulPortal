import { Item } from './item';
export class Product{
    product_id:number;
	productCondition:string;
	productSaleConditions:string;
    productQuantity:string;
    productFormDelivery:string;
    productPaymentMethod:string;
	productWarranty:string;
	productPagoEnvio:string;
	producVolumen:string;
	productPeso:string;
	productLength:number;
	productWidth:number;
	productHeight:number;
	productWeight:number;


	yng_Item:Item =new Item();  
}