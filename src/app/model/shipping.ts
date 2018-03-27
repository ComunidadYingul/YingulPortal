import { AndreaniEnvios } from "./andreaniEnvios";
import { Branch } from "./branch";
import { Quote } from "./quote";
import { Shipment } from "./shipment";

export class Shipping {
    shippingId:number;
    typeShipping:string;
    //yng_envio:AndreaniEnvios =new AndreaniEnvios();
    yng_Quote:Quote=new Quote();
    yng_Shipment:Shipment=new Shipment();
    dhl:boolean;
    fedex:boolean;
    andreani:boolean;
    nameContact:string;
    phoneContact:string;
}