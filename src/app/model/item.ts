import { user } from './user';
import { Ubication } from './ubication';
import { ItemImage } from './item-image';
export class Item {
    private item_id:number;
    price:number;
    money:string;
    name:string;
    description:string;
    video:string;
    yng_Ubication:Ubication= new Ubication;
    user : user=new user();
	itemCategory: Object[];
	itemImage:Object[];
    principalImage : string;
    public get $item_id(): number {
		return this.item_id;
	}

	public set $item_id(value: number) {
		this.item_id = value;
    }
    
    public get $price(): number {
		return this.price;
	}

	public set $price(value: number) {
		this.price = value;
    }

	public get $money(): string {
		return this.money;
	}

	public set $money(value: string) {
		this.money = value;
	}

	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

	public get $description(): string {
		return this.description;
	}

	public set $description(value: string) {
		this.description = value;
	}

	public get $video(): string {
		return this.video;
	}

	public set $video(value: string) {
		this.video = value;
	}


	public get $yng_Ubication(): Ubication {
		return this.yng_Ubication;
	}

	public set $yng_Ubication(value: Ubication) {
		this.yng_Ubication = value;
	}

	public get $user(): user {
		return this.user;
	}

	public set $user(value: user) {
		this.user = value;
	}

	public get $itemCategory(): Object[] {
		return this.itemCategory;
	}

	public set $itemCategory(value: Object[]) {
		this.itemCategory = value;
	}

	public get $principalImage(): string {
		return this.principalImage;
	}

	public set $principalImage(value: string) {
		this.principalImage = value;
	}

	public get $itemImage(): Object[] {
		return this.itemImage;
	}

	public set $itemImage(value: Object[]) {
		this.itemImage = value;
	}


	
    
}
