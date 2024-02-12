import { IPropertyBase } from "./ipropertybase.interface";

export class Property implements IPropertyBase{
    Id: number;
    SellOrRent: number;
    Name: string;
    PType: string;
    BHK: number;
    FType: string;
    Price: number;
    BuiltArea: number;
    CarpetArea?: number;
    Address: string;
    Address2?: string;
    City: string;
    FloorNo?: string;
    TotalFloor?: string;
    ReadyToMove: number;
    AgeOfProperty?: string;
    MainEntrance?: string;
    Security?: number;
    GatedCommunity?: number;
    Maintenance?: number;
    Possession?: string;
    Image?: string;
    Description?: string;
    PostedOn: string;
    PostedBy: number;
}