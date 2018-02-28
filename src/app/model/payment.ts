import { Card } from './card';
export class Payment {
    paymentId:number;
    name:string;
    type:string;
    paymentPlan:string;
    yng_Card:Card=new Card();
    
}
