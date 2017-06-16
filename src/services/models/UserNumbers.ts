import {SavedNumbers} from "./SavedNumbers";
/**
 * Created by LihaiMac on 5/31/17.
 */


export class UserNumbers {
  id:number;
  willBe:number[];

  registered:Date;

  category:string;

  static getCategory(self:UserNumbers):string{
    return self.numbers.category;
  }

  public numbers:SavedNumbers;

  constructor(data:any) {
    this.numbers = new SavedNumbers(data);
    this.registered = new Date();

  }

}
