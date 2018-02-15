import { user } from './user';
import { Item } from './item';
export class Favorite {
    favoriteId:number;
    user : user=new user();
    item : Item= new Item();
}
