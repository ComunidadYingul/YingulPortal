import { user } from './user';
import { CardProvider } from './card-provider';
export class Card {
    cardId:number;
    number:number;
    dueMonth:number;
    dueYear:number;
    fullName:string;
    dni:number;
    securityCode:number;
	type:string;
	provider:string;
    yng_CardProvider:CardProvider=new CardProvider();
	user : user=new user();

}
