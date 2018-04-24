import { user } from './user';
import { Ubication } from './ubication';
import { ItemImage } from './item-image';
export class Item {
    item_id:number;
    price:number;
    money:string;
    name:string;
    description:string;
    video:string;
    yng_Ubication:Ubication= new Ubication;
    user : user=new user();
	itemCategory: Object[];
	itemImage:Object[];
	principalImage : string;
	itemId:number;
	priceNormal:number;
    priceDiscount:number;
    type:string;
    condition:String;
    over:boolean;
    enabled:boolean;
    dayPublication:number;
    monthPublication:number;
    yearPublication:number;
    productPagoEnvio:string;
    logisticsName:string;
    internationalDeliveries:string;
    quantity:number;
    kilometer:number;
    itemYear:number;
    duildedArea:number;
    ambientes:number;
    //datos nuevos para mayor seguridad
    ip:string;
    org:string;
    lat:string;
    lon:string;
    city:string;
    country:string;
    countryCode:string;
    regionName:string;
    zip:string;
    userAgent:string;
    //datos nuevos para mayor seguridad
}
