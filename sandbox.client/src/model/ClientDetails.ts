import {ClientRegisteredAddress} from "./ClientRegisteredAddress";
import {ClientPhoneNumber} from "./ClientPhoneNumber";
import {ClientAddress} from "./ClientAddress";

export class ClientDetails {

  id:number;

  gender:string;
  dateOfBirth: string;

  clientAddress: ClientAddress;

  registeredAddress: ClientRegisteredAddress;

  phoneNumbers: Array<ClientPhoneNumber>;

}
