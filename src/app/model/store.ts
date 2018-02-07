import { user } from './user';
import { ItemImage } from './item-image';
import { Category } from './category';
export class Store {
    storeId:number;
	mainCategory:Category= new Category();
	employeesQuantity:string;
	ecommerceExperience:string;
	webSite:string;
	traficInvest:string;
	itemsType:string;
	
	name:string;
    summary:string;
    video:string;
    user : user=new user();
	mainImage : string;
	bannerImage: string;
   
}
