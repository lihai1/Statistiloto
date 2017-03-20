/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
@Injectable()
export class userData {
    constructor(private http: Http){
        console.log('lottery Api.. initialized!!');
       // this.http=http;
    }
    private forms:numberData[]=[];
    private numbers:numberData[]=[];
    private build:numberData[]=[];

    private baseUrl:string='https://protected-wildwood-80803.herokuapp.com/myresource/';
    private getAll:string='getAll';

    getSavedForms(): Promise<any> {
        return this.http.get(this.baseUrl+this.getAll).toPromise()
            .then(data=>{
                return data.json();
            }).catch(err=>{
                return Promise.resolve(this.forms);
            });
    }
    getSavedNumbers(): Promise<any> {
        return Promise.resolve(this.numbers);
    }
    getNumbers(): numberData[] {
        return this.numbers;
    }
    getForms(): numberData[] {
        return this.forms;
    }
    addSetData(lucky: numberData[]){
     // var tmp;
     // for(let i = 0;i<lucky.length;i++) {
      //  this.numbers.push(tmp = new numberData(lucky[i]));
        this.addAData(this.numbers, lucky);
     // }
    }
    addFormData(lucky: numberData[]){
        this.addAData(this.forms,lucky);
    }
    addToBuild(nums: numberData[]){
      this.addAData(this.build,nums);
    }
    getBuild(): numberData[]{
        return this.build;
    }
    initBuild(){
        this.build = [];
    }
    private addAData(origin:numberData[],lucky: numberData[]){
     // debugger;
        if(!origin.length){
            for(var i=0;i<lucky.length;i++)
                origin.push(lucky[i]);
            return;
        }
        var bad =false;
        for(var i=0;i<lucky.length;i++){
            var j=0;
            if(lucky[i].numbers.length==origin[j].numbers.length){
                for(j=0;j<origin.length;j++){
                    var k=0;
                    for(k=0;k<origin[j].numbers.length;k++){
                        if(lucky[i].numbers[k]!=origin[j][k]){
                            break;
                        }
                    }
                    if(k==origin[j].numbers.length){
                        bad = true;
                    }
                }
            }
            if(!bad){
                origin.push(lucky[i]);
            }
            else bad = false;
        }
    }


  convert(data : number[][]): numberData[]{
    var result =[];

    for(var i=0;i<data.length && i < 15;i++)
      result.push(new numberData(data[i]));
    return result;
  }

  getAllNumbers() {
    var res:numberData[] = this.build.concat([]);
    var tmp;
    for(var i=0;i<this.numbers.length;i++) {
      tmp = this.numbers[i].numbers.concat([]);
      tmp.pop();
      res=res.concat(new numberData(tmp));
    }
    return res;
  }
}
var count_deb = 0;

export class numberData {
  public numbers:number[]=[];
  from:Date;
  to:Date;
  reqeustDate:Date;
  constructor(data : any){
    count_deb++;
    try {
      if (typeof data == 'object') {
        if (data.to != undefined) this.to = new Date(data.to);
        if (data.to != undefined) this.from = new Date(data.from);
        if (data.reqeustDate != undefined) this.from = new Date(data.reqeustDate);
        else this.reqeustDate = new Date();
        this.numbers = data;
      }
      if(  count_deb > 1000)
        debugger;
      console.log('numberData.. initialized!!');
      // this.http=http;
    }
    catch(e){
      console.log(e);
    }
  }
  isEmpty(): boolean{
    return this.numbers.length ==0;
  }
}



// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts



// WEBPACK FOOTER //
// ./src/services/user.service.ts



// WEBPACK FOOTER //
// ./src/services/user.service.ts



// WEBPACK FOOTER //
// ./src/services/user.service.ts
