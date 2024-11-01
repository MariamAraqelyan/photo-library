import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { Photo } from '@interfaces/photo.interface';
import { PhotosService } from '@services/photos.service';

@Component({
  selector: 'app-single-photo-info',
  standalone: true,
  imports: [SinglePhotoItemComponent, MatButtonModule],
  templateUrl: './single-photo-info.component.html',
  styleUrl: './single-photo-info.component.scss'
})
export class SinglePhotoInfoComponent implements OnInit, OnDestroy {

  currentPhoto!: Photo;
  subscription!: Subscription;

  private photoList = inject(PhotosService);
  private route = inject(Router);
  private router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getPhotoInfo();
  }

  getPhotoInfo() {
    const photoId = Number(this.router.snapshot.paramMap.get('id'));

    this.subscription = this.photoList.getState().subscribe((favorites) => {
      this.currentPhoto = favorites.find((el) => el.id === photoId) as Photo;
      if (!this.currentPhoto) this.route.navigate(['/favorites']);
    });
  }

  deleteFromFavorite() {
    this.photoList.removeFromFavorite(this.currentPhoto);
    this.route.navigate(['/favorites']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
