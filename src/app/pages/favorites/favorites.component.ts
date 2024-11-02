import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { PhotosService } from '@services/photos.service';
import { Photo } from '@interfaces/photo.interface';
import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { AnimateDataComponent } from '@animations/animate-data/animate-data.component';

/**
 * Aplication Favorites Component
*/
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [AsyncPipe, AnimateDataComponent, SinglePhotoItemComponent, MatButtonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  /** Data source for favorite photos */
  favorites$: Observable<Photo[]> = of([]);

  /** Inject the Photo Services */
  private photoList = inject(PhotosService);

  /** Inject the route module */
  private router = inject(Router);

  /**
   * Initialize
  */
  ngOnInit(): void {
    this.favorites$ = this.photoList.getState();
  }

  /**
   * React when the "Add to Favorites" button is clicked
   * 
   * @param photo Selected photo data
  */
  openPhoto(photo: Photo) {
    this.router.navigate([`/photos/${photo.id}`]);
  }
}
