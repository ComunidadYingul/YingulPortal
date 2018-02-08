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
}
