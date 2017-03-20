import {Injectable, Pipe} from '@angular/core';
import {numberData} from "../services/user.service";

/*
 Generated class for the ArraysFilter pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'arrays-filter'
})
@Injectable()
export class ArraysFilter {
  /*
   Takes a value and makes it lowercase.
   */
  transform(values:number[][], maxSplit) {
    var archiveSize : number = values.splice(0, 1)[0][0];
    var res:AnalyzedData[]=[];
    values.sort((a:number[], b:number[])=> a.length - b.length);
    var prevSize = 2;
    for (var i = 0; i < values.length; i++) {
      if (values[i].length != prevSize) {
        res.push(new AnalyzedData(values.splice(0, i),archiveSize));
        i=0;
      }
      prevSize = values.length>0?values[i].length:0;
    }
    return res;
  }
}
export class AnalyzedData {
  archiveSize:number;
  count:number;
  numbers:numberData[] = [];
  title: string = "";
  constructor(numbers:number[][],archiveSize:number) {
    numbers.forEach(item => this.numbers.push(new numberData(item)));
    this.archiveSize = archiveSize;
    this.count=0;
    this.title = "שכיחות של ";
    this.title += numbers[0].length -1;
    this.title += " מספרים: ";
    for(var i=0;i<numbers.length;i++){
      this.count+=numbers[i][numbers[i].length-1];
    }
    this.title += this.count/37;
  }
}



// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts


// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts



// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts


// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts


// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts


// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts


// WEBPACK FOOTER //
// ./src/pipes/arrays-filter.ts
