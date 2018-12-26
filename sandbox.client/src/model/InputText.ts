import {PersonDisplay} from "./PersonDisplay";


export class InputText {

  public requestId: number;
  public text: string;

  public static of(a: any): InputText {
    const ret = new InputText();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.requestId = a.requestId;
    this.text = a.text;
  }

}
