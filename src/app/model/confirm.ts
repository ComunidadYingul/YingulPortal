import { Buy } from './buy';
export class Confirm {
    confirmId:number;

    sellerConfirm:boolean;
    daySellerConfirm:number;
    monthSellerConfirm:number;
    yearSellerConfirm:number;

    buyerConfirm:boolean;
    dayBuyerConfirm:number;
    monthBuyerConfirm:number;
    yearBuyerConfirm:number;

    dayInitClaim:number;
    monthInitClaim:number;
    yearInitiClaim:number;

    dayEndClaim:number;
    monthEndClaim:number;
    yearEndClaim:number;

    codeConfirm:number;
    status:string;

    buy : Buy=new Buy();
}