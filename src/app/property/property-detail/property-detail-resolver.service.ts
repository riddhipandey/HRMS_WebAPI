import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { Property } from "src/app/model/property";
import { HousingService } from "src/app/services/housing.service";



@Injectable({
    providedIn:'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

    constructor(private _housingService : HousingService, private _router: Router){}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot):Property | Observable<Property>{
        const propertyId = +route.params['id'];
        return this._housingService.getPropertyById(propertyId).pipe(
            catchError((error:any) => {
                console.log('Error occured in service'+error);
                this._router.navigate(['/']);
                return of(null);
            })
        );
       
    } 
}