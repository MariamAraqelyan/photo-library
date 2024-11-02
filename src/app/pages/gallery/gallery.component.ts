import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { PhotosService } from '@services/photos.service';
import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { Photo } from '@interfaces/photo.interface';
import { InfiniteScrollComponent } from '@scrolls/infinite-scroll/infinite-scroll.component';
import { AnimateDataComponent } from '@animations/animate-data/animate-data.component';

/**
 * Aplication Gallery Component
*/
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [InfiniteScrollComponent, AnimateDataComponent, AsyncPipe, SinglePhotoItemComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {
  /** Active Route */
  private route = inject(ActivatedRoute);
  /** Available photo data */
  private photoList = inject(PhotosService);
  /** A boolean tracking whether a data is available */
  library: Photo[] = [];
  /** A boolean value that tracks whether new photo data is available or not. */
  hasMore: boolean = false;
  /** A boolean tracking whether a data is available */
  loading: boolean = true;
  /** Error Message */
  errorMessage: string = 'Loading...';
  /** User for subscription cleanup for route sub*/
  routeSubscription!: Subscription;
  /** User for subscription cleanup */
  storeSubscription!: Subscription;

  /**
   * Initialize
  */
  ngOnInit(): void {
    this.routeSubscription = this.route.data
      .pipe(first())
      .subscribe(() => this.getNext());
  }

  /**
   * Updating the upload status and photo list
  */
  getNext() {
    this.storeSubscription = this.photoList.loadNext().subscribe((photos) => {
      this.library.push(...photos);
      this.hasMore = this.library.length < this.photoList.totalPhotos;
      this.loading = false;
      if (!this.library.length) this.errorMessage = 'Library is empty!';
    });
  }

  /**
   * New update after every new load
  */
  onScroll() {
    this.loading = true;
    this.getNext();
  }

  /**
   * React when the "Add to Favorites" button is clicked
   * 
   * @param photo Selected photo data
  */
  addToFavorite(photo: Photo) {
    const index = this.library.findIndex((el) => el.id === photo.id);
    this.library[index].favorite = true;
    this.photoList.addToFavorite(photo);
  }

  /**
   * Cleanup pending subscriptions.
  */
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
    this.photoList.emptyPhotos();
  }

}
