import { user } from './user';
import { Ubication } from './ubication';
import { ItemImage } from './item-image';
export class Account {
    accountId:number;

    withheldMoney:number;
    availableMoney:number;
    releasedMoney:number;

    currency:string;
    accountNonExpired:boolean;
    accountNonLocked:boolean;

    user : user=new user();
    
}
