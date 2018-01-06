import { ListCreditCard } from './list-credit-card';
import { CardProvider } from './card-provider';
export class CreditCardProvider {
    private creditCardProviderId:number;
    private listCreditCard:ListCreditCard=new ListCreditCard();
    private cardProvider:CardProvider=new CardProvider();

	public get $creditCardProviderId(): number {
		return this.creditCardProviderId;
	}

	public set $creditCardProviderId(value: number) {
		this.creditCardProviderId = value;
	}

	public get $listCreditCard(): ListCreditCard {
		return this.listCreditCard;
	}

	public set $listCreditCard(value: ListCreditCard) {
		this.listCreditCard = value;
	}

	public get $cardProvider(): CardProvider {
		return this.cardProvider;
	}

	public set $cardProvider(value: CardProvider) {
		this.cardProvider = value;
	}
}
