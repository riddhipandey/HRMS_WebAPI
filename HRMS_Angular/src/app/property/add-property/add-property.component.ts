import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase.interface';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';


@Component({
    selector:'app-add-proprty',
    templateUrl : 'add-property.component.html',
    styleUrls : ['add-property.component.css']
})
export class AddPropertyComponent{
    // @ViewChild('Form')addPropertyForm!: NgForm;
    @ViewChild('selectTab') selectTab!: TabsetComponent;
    property = new Property();
    addPropertyForm : FormGroup;
    nextClicked : boolean;
    
    propertyType = ['House','Apartment','Duplex'];
    furnishedType = ['Unfurnished','Semi','Fully'];
    mainEntranceDirection =['East','West','South','North']

    propertyView:IPropertyBase = {
        Id: null,
        Name: null,
        Price: null,
        PType: null,
        SellOrRent: null,
        FType:null,
        BHK: null,
        BuiltArea: null,
        City:null,
        ReadyToMove:null
    };

    constructor(private _formBuilder: FormBuilder, private _housingService: HousingService,
        private _router : Router){
       
    }

    ngOnInit(){
        this.createAddPropertyForm();
    }

    createAddPropertyForm(){
        this.addPropertyForm = this._formBuilder.group({
            BasicInfo : this._formBuilder.group({
                SellOrRent : ['1',Validators.required],
                BHK : [null,Validators.required],
                PType : [null,Validators.required],
                FType : [null,Validators.required],
                Name : [null,Validators.required],
                City : [null,Validators.required]
            }),
            PriceInfo : this._formBuilder.group({
                Price :  [null,Validators.required],
                Security : [null],
                Maintenance :  [null],
                BuiltArea : [null,Validators.required],
                CarpetArea : [null]
            }),
            AddressInfo : this._formBuilder.group({
                Floor :  [null],
                TotalFloor : [null],
                Address :  [null,Validators.required],
                Landmark : [null]
            }),
            OtherDetails : this._formBuilder.group({
                ReadyToMove :  [null,Validators.required],
                AvailableFrom : [null],
                AgeOfProperty :  [null],
                GatedCommunity : [null],
                MainEntrance : [null],
                Description : [null]
            })

        })

    }

   
    onSubmit(){
        this.nextClicked = true;
        if(this.isAllTabValid()){
            console.log('Congrats! form submitted.')
            console.log(this.addPropertyForm); 
            this.mapPropertyFields()
            this._housingService.savePropertyDeatils(this.property);
            if(this.property.SellOrRent == 2){
                this._router.navigate(['/rent-property']);
            }else{
                this._router.navigate(['/']);
            }
        }else{
            console.log('Please review form and provide all values.')
        }
    }

    mapPropertyFields() : void {
        this.property.Id = this._housingService.newPropertyId();
        this.property.SellOrRent = +this.SellOrRent.value
        this.property.Name =this.Name.value
        this.property.PType=this.PType.value
        this.property.BHK=this.BHK.value
        this.property.FType=this.FType.value
        this.property.Price=this.Price.value
        this.property.BuiltArea=this.BuiltArea.value
        this.property.CarpetArea=this.CarpetArea.value
        this.property.Address=this.Address.value
        this.property.Address2=this.Landmark.value
        this.property.City=this.City.value
        this.property.FloorNo=this.Floor.value
        this.property.TotalFloor=this.TotalFloor.value
        this.property.ReadyToMove=this.ReadyToMove.value
        this.property.AgeOfProperty=this.AgeOfProperty.value
        this.property.MainEntrance=this.Maintenance.value
        this.property.Security=this.Security.value
        this.property.GatedCommunity=this.GatedCommunity.value
        this.property.Maintenance=this.Maintenance.value
        this.property.Possession=this.AvailableFrom.value
        this.property.Description=this.Description.value
        this.property.PostedOn=new Date().toString();
    }

    isAllTabValid() : boolean{
            if(this.BasicInfo.invalid){
                this.selectTab.tabs[0].active = true; 
                return false;
            }
            if(this.PriceInfo.invalid){
                this.selectTab.tabs[1].active = true;
                return false;
            }
            if(this.AddressInfo.invalid){
                this.selectTab.tabs[2].active = true;
                return false;
            }
            if(this.OtherDetails.invalid){
                this.selectTab.tabs[3].active = true;
                return false;
            }
        return true;
    }

    onSelectTab(tabId : number, isCurrentTabValid : boolean){
        this.nextClicked = true;
        if (isCurrentTabValid && this.selectTab?.tabs[tabId]) {
            this.selectTab.tabs[tabId].active = true;
          }
    }
    ///-----------------------------------
    ///Getter Methods
    ///-----------------------------------

    // #region TabGetter
    get BasicInfo() : FormGroup{
        return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
    }

    get PriceInfo() : FormGroup{
        return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
    }

    get AddressInfo() : FormGroup{
        return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
    }

    get OtherDetails() : FormGroup{
        return this.addPropertyForm.controls['OtherDetails'] as FormGroup;
    }
    // #endregion
    // #region BasicInfo
    get SellOrRent(): FormControl{
        return this.BasicInfo.controls['SellOrRent'] as FormControl;
    }
    get BHK() : FormControl{
        return this.BasicInfo.controls['BHK'] as FormControl;
    }
    get PType(): FormControl{
        return this.BasicInfo.controls['PType'] as FormControl;
    }
    get FType() : FormControl{
        return this.BasicInfo.controls['FType'] as FormControl;
    }
    get Name(): FormControl{
        return this.BasicInfo.controls['Name'] as FormControl;
    }
    get City(): FormControl{
        return this.BasicInfo.controls['City'] as FormControl;
    }
    // #endregion
    // #region PriceInfo
    get Price() : FormControl{
        return this.PriceInfo.controls['Price'] as FormControl;
    }
    get Security() : FormControl{
        return this.PriceInfo.controls['Security'] as FormControl;
    }
    get Maintenance(): FormControl{
        return this.PriceInfo.controls['Maintenance'] as FormControl;
    }
    get BuiltArea() : FormControl{
        return this.PriceInfo.controls['BuiltArea'] as FormControl;
    }
    get CarpetArea(): FormControl{
        return this.PriceInfo.controls['CarpetArea'] as FormControl;
    }
    // #endregion
    // #region AddressInfo
    get Floor(): FormControl{
        return this.AddressInfo.controls['Floor'] as FormControl;
    }
    get TotalFloor() : FormControl{
        return this.AddressInfo.controls['TotalFloor'] as FormControl;
    }
    get Address(): FormControl{
        return this.AddressInfo.controls['Address'] as FormControl;
    }
    get Landmark() : FormControl{
        return this.AddressInfo.controls['Landmark'] as FormControl;
    }
    // #endregion
    // #region OtherDetails
    get ReadyToMove(): FormControl{
        return this.OtherDetails.controls['ReadyToMove'] as FormControl;
    }
    get AvailableFrom() : FormControl{
        return this.OtherDetails.controls['AvailableFrom'] as FormControl;
    }
    get AgeOfProperty(): FormControl{
        return this.OtherDetails.controls['AgeOfProperty'] as FormControl;
    }
    get GatedCommunity() : FormControl{
        return this.OtherDetails.controls['GatedCommunity'] as FormControl;
    }
    get MainEntrance(): FormControl{
        return this.OtherDetails.controls['MainEntrance'] as FormControl;
    }
    get Description(): FormControl{
        return this.OtherDetails.controls['Description'] as FormControl;
    }
    // #endregion

}