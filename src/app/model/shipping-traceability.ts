import { ShippingEvento } from "./shipping-evento";

export class ShippingTraceability {
    fechaAlta:string;
	eventos:ShippingEvento= new ShippingEvento();
	nombreEnvio:string;
	nroAndreani:string;
	constructor() {
	}
}