import { Item } from './item';
import { Province } from './province';
export class Product{
    private product_id:number;
	private productCondition:string;
	private productSaleConditions:string;
    private productQuantity:string;
    private productFormDelivery:string;
    private productPaymentMethod:string;
	private productWarranty:string;
    private productPagoEnvio:string;
    private yng_Item:Item =new Item();
	


	public get $product_id(): number {
		return this.product_id;
	}

	public set $product_id(value: number) {
		this.product_id = value;
	}
    

	public get $productCondition(): string {
		return this.productCondition;
	}

	public set $productCondition(value: string) {
		this.productCondition = value;
	}

	public get $productSaleConditions(): string {
		return this.productSaleConditions;
	}

	public set $productSaleConditions(value: string) {
		this.productSaleConditions = value;
	}

	public get $productQuantity(): string {
		return this.productQuantity;
	}

	public set $productQuantity(value: string) {
		this.productQuantity = value;
	}



	public get $productWarranty(): string {
		return this.productWarranty;
	}

	public set $productWarranty(value: string) {
		this.productWarranty = value;
	}

	public get $yng_Item(): Item  {
		return this.yng_Item;
	}

	public set $yng_Item(value: Item ) {
		this.yng_Item = value;
	}


	public get $productPagoEnvio(): string {
		return this.productPagoEnvio;
	}

	public set $productPagoEnvio(value: string) {
		this.productPagoEnvio = value;
	}

	

	public get $productFormDelivery(): string {
		return this.productFormDelivery;
	}

	public set $productFormDelivery(value: string) {
		this.productFormDelivery = value;
	}


	public get $productPaymentMethod(): string {
		return this.productPaymentMethod;
	}

	public set $productPaymentMethod(value: string) {
		this.productPaymentMethod = value;
	}
    
}