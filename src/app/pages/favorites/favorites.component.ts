import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { PhotosService } from '@services/photos.service';
import { Photo } from '@interfaces/photo.interface';
import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { AnimateDataComponent } from '@animations/animate-data/animate-data.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [AsyncPipe, AnimateDataComponent, SinglePhotoItemComponent, MatButtonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  favorites$: Observable<Photo[]> = of([]);

  private photoList = inject(PhotosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.favorites$ = this.photoList.getState();
  }

  openPhoto(photo: Photo) {
    this.router.navigate([`/photos/${photo.id}`]);
  }

}
