import { Card } from './card';
export class PaymentMethod {
    paymentMethodId:number;
    name:string;
    type:string;
    paymentPlan:string;
    yng_Card:Card=new Card();
    
}
