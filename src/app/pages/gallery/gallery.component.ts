import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { PhotosService } from '../../core/services/photos.service';
import { InfiniteScrollComponent } from '../../shared/components/infinite-scroll/infinite-scroll.component';
import { AnimateDataComponent } from '../../shared/components/animate-data/animate-data.component';
import { SinglePhotoItemComponent } from '../../common-ui/single-photo-item/single-photo-item.component';
import { Photo } from '../../core/interfaces/photo.interface';

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
      console.log(this.library, 'library..')
      this.library.push(...photos);
      this.hasMore = this.library.length < this.photoList.totalPhotos;
      this.loading = false;
      if (!this.library.length) this.errorMessage = 'Library is empty!';
    });
  }

  onScroll() {
    this.loading = true;
    this.getNext();
    debugger
  }

  addToFavorite(photo: Photo) {
    const index = this.library.findIndex((el) => el.id === photo.id);
    this.library[index].favorite = true;

    this.photoList.addToFavorite(photo); ///////////////////////////change /////////////////
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();

    this.photoList.emptyPhotos();
  }

}
