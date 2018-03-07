import { Bank } from './bank';
import { Transaction } from './transaction';
export class WireTransfer {
    wireTransferId:number;

    titularName:string;
    cuitCuil:string;
    cuitCuilNumber:number;
    accountType:string;
    cbu:number;
    amount:number;
    currency:string;
    status:string;
    bank : Bank=new Bank();
    transaction : Transaction=new Transaction();
    
}
