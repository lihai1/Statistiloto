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
    private forms:number[][]=[];
    private numbers:number[][]=[];
    private build:number[]=[];

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
    getNumbers(): number[][] {
        return this.numbers;
    }
    getForms(): number[][] {
        return this.forms;
    }
    addSetData(lucky: number[][]){
        this.addAData(this.numbers,lucky);
    }
    addFormData(lucky: number[][]){
        this.addAData(this.forms,lucky);
    }
    addToBuild(nums: number[]){
        for(var i=0;i<nums.length;i++)
            this.build.push(nums[i]);
    }
    getBuild(){
        return this.build;
    }
    initBuild(){
        this.build = [];
    }
    private addAData(origin:number[][],lucky: number[][]){
        if(!origin.length){
            for(var i=0;i<lucky.length;i++)
                origin.push(lucky[i]);
            return;
        }
        var bad =false;
        for(var i=0;i<lucky.length;i++){
            var j=0;
            if(lucky[i].length==origin[j].length){
                for(j=0;j<origin.length;j++){
                    var k=0;
                    for(k=0;k<origin[j].length;k++){
                        if(lucky[i][k]!=origin[j][k]){
                            break;
                        }
                    }
                    if(k==origin[j].length){
                        bad = true;
                    }
                }
                //if(lucky[i][j]!=origin[i][j]){
                //    break;
                //}
            }
            if(!bad){
                origin.push(lucky[i]);
            }
            else bad = false;
        }
    }
}