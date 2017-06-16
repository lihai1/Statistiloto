import { Pipe, PipeTransform } from '@angular/core';
import {UserNumbers} from "../../services/models/UserNumbers";
import {NumbersCategory} from "../../services/appSettings.service";

/**
 * Generated class for the NumbersCategoryPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'numbers-category',
})
export class NumbersCategoryPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(values: UserNumbers[], ...args) :UserNumbers[][]{
    var cats=NumbersCategory.getCategories();
    var ans = [];
    cats.forEach((cat,index,arr)=>{
      ans.push([]);
    });
    cats.forEach((cat,catInd,arr)=>{
      values.forEach((value,index,arr2)=>{
        if (UserNumbers.getCategory(value) == cat) {
          ans[catInd].push(value);
        }
      });
    });
    return ans;
  }
}

