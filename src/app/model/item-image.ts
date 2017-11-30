export class ItemImage {
    private item_id:number;
    private image:string;

	public get $item_id(): number {
		return this.item_id;
	}

	public set $item_id(value: number) {
		this.item_id = value;
	}

	public get $image(): string {
		return this.image;
	}

	public set $image(value: string) {
		this.image = value;
	}
    
}
