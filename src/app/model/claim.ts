import { Confirm } from './confirm';
export class Claim {
    claimId:number;
    claimText:string;
    change:boolean;
	codeChange:number;
	back:boolean;
	codeBack:number;
	minuse:boolean;
	codeMinuse:number;
	status:string;
    confirm : Confirm=new Confirm();
}
