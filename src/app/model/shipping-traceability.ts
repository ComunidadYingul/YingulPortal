import { ShippingEvento } from "./shipping-evento";

export class ShippingTraceability {
    FechaAlta:string;
	Eventos:ShippingEvento= new ShippingEvento();
	NombreEnvio:string;
	NroAndreani:string;
	constructor() {
	}
}