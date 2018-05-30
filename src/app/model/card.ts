import { user } from './user';
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
	user : user=new user();

}
