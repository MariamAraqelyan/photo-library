import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { PhotosService } from '@services/photos.service';
import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';
import { Photo } from '@interfaces/photo.interface';
import { InfiniteScrollComponent } from '@scrolls/infinite-scroll/infinite-scroll.component';
import { AnimateDataComponent } from '@animations/animate-data/animate-data.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [InfiniteScrollComponent, AnimateDataComponent, AsyncPipe, SinglePhotoItemComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private photoList = inject(PhotosService);

  library: Photo[] = [];
  hasMore: boolean = false;
  loading: boolean = true;
  errorMessage: string = 'Loading...';
  routeSubscription!: Subscription;
  storeSubscription!: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.data
      .pipe(first())
      .subscribe(() => this.getNext());
  }

  getNext() {
    this.storeSubscription = this.photoList.loadNext().subscribe((photos) => {
      this.library.push(...photos);
      this.hasMore = this.library.length < this.photoList.totalPhotos;
      this.loading = false;
      if (!this.library.length) this.errorMessage = 'Library is empty!';
    });
  }

  onScroll() {
    this.loading = true;
    this.getNext();
  }

  addToFavorite(photo: Photo) {
    const index = this.library.findIndex((el) => el.id === photo.id);
    this.library[index].favorite = true;
    this.photoList.addToFavorite(photo);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
    this.photoList.emptyPhotos();
  }

}
