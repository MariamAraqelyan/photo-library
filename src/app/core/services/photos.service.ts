import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DBMainService } from './dbmain.service';
import { Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private updatePhotos = new BehaviorSubject<Photo[]>([]);
  private saveState = new BehaviorSubject<Photo[]>([]);
  private state: Observable<Photo[]> = this.saveState as Observable<Photo[]>;
  private dbData = inject(DBMainService)

  private page: number = 0;
  totalPhotos: number = 0;

  constructor() {
    this.totalPhotos = this.dbData.totalPhotos;
  }

  loadNext(page = this.page) {
    return this.dbData.getRange(page).pipe(
      tap((data) => {
        this.page += 1;
        const currentPhotos = this.getClone();
        this.updatePhotos.next(
          this.getFavoriteStatus([...currentPhotos, ...data])
        );
      })
    );
  }

  getClone() {
    const photos = this.updatePhotos.getValue();
    return photos.slice(0);
  }

  getState(): Observable<Photo[]> {
    return this.state;
  }

  setState(state: Photo[]) {
    this.saveState.next(state);
  }

  emptyPhotos() {
    this.updatePhotos.next([]);
    this.page = 0;
  }

  updateFavoriteStatus(photo: Photo, status: boolean) {
    const photos = this.getClone();
    const photoIndex = photos.findIndex((p) => p.id == photo.id);
    photos[photoIndex]['favorite'] = status;

    return photos;
  }

  getFavoriteStatus(photos: Photo[]) {
    const favoriteIds = this.saveState
      .getValue()
      .slice(0)
      .map((photos) => photos.id);

    photos.forEach(
      (photo) => (photo.favorite = favoriteIds.includes(photo.id))
    );

    return photos;
  }

  addToFavorite(photo: Photo) {
    const updated = this.updateFavoriteStatus(photo, true);
    this.updatePhotos.next(updated);
    const filterPhotos = updated.filter((p) => p.favorite);

    // Update state
    this.saveState.next(filterPhotos);
    localStorage.setItem('favorites', JSON.stringify(filterPhotos));
  }

  removeFromFavorite(photo: Photo) {
    const state = this.saveState.getValue().slice(0);
    (state.find((el) => el.id === photo.id) as Photo).favorite = false;
    const filterPhotos = state.filter((p) => p.favorite);

    // Update state
    this.saveState.next(filterPhotos);
    localStorage.setItem('favorites', JSON.stringify(filterPhotos));
  }

  loadPhotos() {
    return this.dbData.load();
  }
}
