import { Card } from './card';
import { CashPayment } from './cash-payment';
export class Payment {
    paymentId:number;
    name:string;
    type:string;
    paymentPlan:string;
    yng_Card:Card=new Card();
    cashPayment:CashPayment=new CashPayment();
    status:string;
	orderId:number;
	referenceCode:string;
    transactionId:string;
    value:number;
    currency:string;
    buyStatus:string;
}
