import { Item } from './item';
import { Province } from './province';
export class Motorized {
    motorized_id:number;
    motorizedBrand: string;
    motorizedModel: string;
    motorizedUnicoDue: string;

    motorizedDoor: string;
    motorizedFuelType: string;
    motorizedColor: string;
    motorizedDirection: string;
    motorizedTransmission: string;
    motorizedTractionControl: string;
    motorizedMotor: string;
    motorizedType: string;

    motorizedSecurity: Object[];
    motorizedConfort: Object[];
    motorizedSound: Object[];
    motorizedExterior: Object[];
    motorizedEquipment: Object[];

    yng_Item: Item = new Item();
 
}