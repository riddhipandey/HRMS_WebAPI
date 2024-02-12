import { Component } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { catchError, delay, of } from 'rxjs';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  public propertyId : number = 1;
  property = new Property();

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _route:ActivatedRoute, private _housingService : HousingService,
    private _router : Router){
  }

  ngOnInit(){
      // Img Gallery
      this.galleryOptions = [
        {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: false
        }
      ];
  
      this.galleryImages = [
        {
          small: 'assets/images/house_default.jpg',
          medium: 'assets/images/house_default.jpg',
          big: 'assets/images/house_default.jpg'
        },
        {
          small: 'assets/images/house_default.jpg',
          medium: 'assets/images/house_default.jpg',
          big: 'assets/images/house_default.jpg'
        },
        {
          small: 'assets/images/house_default.jpg',
          medium: 'assets/images/house_default.jpg',
          big: 'assets/images/house_default.jpg'
        },{
          small: 'assets/images/house_default.jpg',
          medium: 'assets/images/house_default.jpg',
          big: 'assets/images/house_default.jpg'
        },
        {
          small: 'assets/images/house_default.jpg',
          medium: 'assets/images/house_default.jpg',
          big: 'assets/images/house_default.jpg'
        }
      ];
    console.log('Property Detail component');
    this._route.data.subscribe(
      data =>{
        this.property = data['propertyResolver'];
      }
    )

  
  }

}
