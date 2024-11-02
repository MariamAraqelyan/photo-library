import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { Photo } from '@interfaces/photo.interface';
import { PhotosService } from '@services/photos.service';

/** Presents Single Photo Info */
@Component({
  selector: 'app-single-photo-info',
  standalone: true,
  imports: [SinglePhotoItemComponent, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './single-photo-info.component.html',
  styleUrl: './single-photo-info.component.scss'
})
export class SinglePhotoInfoComponent implements OnInit, OnDestroy {

  /** Current photo data */
  currentPhoto!: Photo;

  /** User for subscription cleanup */
  subscription!: Subscription;

  /** Inject the Photo Services */
  private photoList = inject(PhotosService);

  /** Inject the route module */
  private route = inject(Router);

  /** Inject the active route module */
  private router = inject(ActivatedRoute);

  /**
   * Initialize
  */
  ngOnInit(): void {
    this.getPhotoInfo();
  }

  /**
   * Get data about current photo from the entire photo list
  */
  getPhotoInfo() {
    const photoId = Number(this.router.snapshot.paramMap.get('id'));

    this.subscription = this.photoList.getState().subscribe((favorites) => {
      this.currentPhoto = favorites.find((el) => el.id === photoId) as Photo;
      if (!this.currentPhoto) this.route.navigate(['/favorites']);
    });
  }

  /**
   * React when the "deleteFromFavoriteList" button is clicked
  */
  deleteFromFavoriteList() {
    this.photoList.removeFromFavorite(this.currentPhoto);
    this.route.navigate(['/favorites']);
  }

  /**
   * Cleanup pending subscriptions.
  */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
