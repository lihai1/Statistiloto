import {NumbersCategory} from "../appSettings.service";
import {AppTools} from "../appTools.service";
/**
 * Created by LihaiMac on 5/31/17.
 */


export class SavedNumbers {
  id:number;
  dateGenerated:Date;

  dateStart:Date;

  dateEnd:Date;
  public numbers:number[] = [];

  category:string;

  constructor(data:any) {
    // count_deb++;
    try {
      //debugger;
      if (typeof data == 'object' && data.length == undefined) {
        if (data.dateEnd != undefined)
          this.dateEnd = AppTools.normalizeDate(data.dateEnd);

        if (data.dateStart != undefined)
          this.dateStart = AppTools.normalizeDate(data.dateStart);

        if (data.dateGenerated != undefined)
          this.dateGenerated = AppTools.normalizeDate(data.dateGenerated);
        else this.dateGenerated = new Date();

        if (data.numbers != undefined)
          this.numbers =data.numbers;

        if (data.category != undefined)
          this.category =data.category;

      }
      else{
        this.numbers = data;
        this.category= NumbersCategory.API_USER_LUCKY;
      }
      // if (count_deb > 1000)
      // debugger;
      console.log('SavedNumbers.. initialized!!');
      // this.http=http;
    }
    catch (e) {
      console.log(e);
    }
  }

  isEmpty():boolean {
    return this.numbers.length == 0;
  }


}
