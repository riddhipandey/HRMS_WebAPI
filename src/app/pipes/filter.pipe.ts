import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name : 'filter'
})
export class FilterPipe implements PipeTransform{
    constructor(){

    }

    transform(value:any[], filterString : string, propertyName : any) : any[] {
        console.log('Pipe started');
        const resultArray: any[] = [];
        if(value.length===0 || filterString === '' || propertyName === ''){
            console.log('Pipe Value');
            return value;
        }
        else{
            for(const item of value){
                if(item[propertyName] === filterString || item[propertyName] === +filterString)
                    resultArray.push(item);
            }
        }
        console.log('Pipe Ended');
        return resultArray;
    }

}