import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { IPropertyBase } from '../model/ipropertybase.interface';
import { Property } from '../model/property';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) {}

  getPropertyById(propertyId : number): Observable<Property> {
       return this.getAllProperties().pipe(
        map((properties) =>{
            // throw Error('Some Error');
            return properties.find(p =>p.Id === propertyId)
            }
          )
       )
  }


  getAllProperties(SellOrRent?: number) : Observable<Property[]>{
    return this.http.get('data/properties.json').pipe(
        map((data:any) =>{
            const propetiesArray : Array<Property> = [];
            const localProperties = JSON.parse(localStorage.getItem('propertyList'))

              for( const id in localProperties){
                if(SellOrRent){
                  if(localProperties.hasOwnProperty(id) && localProperties[id].SellOrRent == SellOrRent){
                      propetiesArray.push(localProperties[id]);
                  }
                }
                else{
                  propetiesArray.push(localProperties[id]);
                }
              }
            
              for( const id in data){
                if(SellOrRent){
                  if(data.hasOwnProperty(id) && data[id].SellOrRent == SellOrRent){
                      propetiesArray.push(data[id]);
                  }
                }else{
                    propetiesArray.push(data[id]);
                }
              }
              
            return propetiesArray;
        }) 
    );
  }

  savePropertyDeatils(objProperty:Property){
    let newPropertyList = [objProperty];
    if(localStorage.getItem('propertyList')){
      newPropertyList = [objProperty, ...JSON.parse(localStorage.getItem('propertyList'))];
    }
    localStorage.setItem('propertyList', JSON.stringify(newPropertyList));
  }

  newPropertyId() : number{
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',JSON.stringify((+localStorage.getItem('PID'))+1))
      return  +localStorage.getItem('PID');
    }else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }

}
