import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DBMainService } from '../services/dbmain.service';
import { PhotosService } from '../services/photos.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosResolver implements Resolve<boolean> {
    dbMain = inject(DBMainService);
    photoList = inject(PhotosService);

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.dbMain.isEmpty() ? this.photoList.loadPhotos() : of([]);
    }
}