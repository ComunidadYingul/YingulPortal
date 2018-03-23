import { user } from './user';
import { Item } from './item';
export class Query {
    queryId:number;
    query:string;
    answer:string;
    date:string;
    status:string;
    yng_Item:Item=new Item();
    user:user= new user();
    seller:user= new user();

}
