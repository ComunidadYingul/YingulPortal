import { ListCreditCard } from './list-credit-card';
import { CardProvider } from './card-provider';
export class CreditCardProvider {
    creditCardProviderId:number;
    listCreditCard:ListCreditCard=new ListCreditCard();
    cardProvider:CardProvider=new CardProvider();
}
