import { Item } from './item';
export class Product{
    product_id:number;
	productCondition:string;
	productSaleConditions:string;
    productFormDelivery:string;
    productPaymentMethod:string;
	productWarranty:string;
	productPagoEnvio:string;
	producVolumen:string;
	productPeso:string;

	yng_Item:Item =new Item();  
}