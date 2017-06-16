import {Injectable, Pipe} from '@angular/core';
import {AppTools} from "../services/appTools.service";
import {SavedNumbers} from "../services/models/SavedNumbers";

/*
 Generated class for the ArraysFilter pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'arrays-filter',
})
@Injectable()
export class ArraysFilter {
  /*
   Takes a value and makes it lowercase.
   */
  constructor(public app:AppTools){
    this.app = app;
  }
  transform(values:number[][], maxSplit) {
    var archiveSize : number = values.splice(0, 1)[0][0];
    var res:AnalyzedData[]=[];
    values.sort((a:number[], b:number[])=> a.length - b.length);
    var prevSize = 2;
    for (var i = 0; i < values.length; i++) {
      if (values[i].length != prevSize) {
        let combos = this.app.sumCombinations(values[i].length -1,37);
        res.push(new AnalyzedData(values.splice(0, i),archiveSize,combos));
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
  numbers:SavedNumbers[] = [];
  title: string = "";
  constructor(numbers:number[][],archiveSize:number,combos:number) {
    numbers.forEach(item => this.numbers.push(new SavedNumbers(item)));
    this.archiveSize = archiveSize;
    this.count=0;
    this.title = "שכיחות של ";
    this.title += numbers[0].length -1;
    this.title += " מספרים: ";
    for(var i=0;i<numbers.length;i++){
      this.count+=numbers[i][numbers[i].length-1];
    }
    var tmp = (this.count/combos)+'';
    this.title += tmp.substring(0,tmp.indexOf('.')+4);
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
