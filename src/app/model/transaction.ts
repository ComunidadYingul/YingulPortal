import { Account } from './account';

export class Transaction {
    transactionId:number;
    amount:number;
    currency:string;
    day:number;
    month:number;
    year:number;
    type:string;
    description:string;
    ip:string;
    org:string;
    lat:string;
    lon:string;
    city:string;
    country:string;
    countryCode:string;
    regionName:string;
    zip:string;
    isAYingulTransaction:boolean;
    isAWireTransfer:boolean;


    account:Account= new Account();
}
