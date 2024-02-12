import { Component } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase.interface';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  SellOrRent : number = 1;
    properties: Array<IPropertyBase> =[];
    City = '';
    searchCity = '';
    sortValue = '';
    sortDirection = 'asc';
   
  constructor(private _activatedRoute : ActivatedRoute, private _housingService : HousingService){
      if(this._activatedRoute.snapshot.url.toString()){
        this.SellOrRent = 2;
      }
    
    this._housingService.getAllProperties(this.SellOrRent).subscribe(
      data =>{ 
        this.properties = data;
        }); 
  }

   ngOnInit(){
    // let filterAttribute = 
    }

    // onSort(){
    //   this.sortValue="Price";
    //   console.log(this.sortValue);
    // }
    onSortDirection(){
      if(this.sortDirection==='desc'){
        this.sortDirection='asc'
      }else{
        this.sortDirection='desc'
      }
      console.log(this.sortDirection);
      console.log(this.sortValue);
    }

    onCityFilter(){
      this.searchCity = this.City;
    }
    onClearSearch(){
      this.searchCity = '';
      this.City='';
    }
}
