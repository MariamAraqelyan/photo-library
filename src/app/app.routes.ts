import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PhotosResolver } from './core/resolvers/photos-data.resolver';
import { SinglePhotoInfoComponent } from './pages/single-photo-info/single-photo-info.component';

export const routes: Routes = [
    {
        path: '',
        component: GalleryComponent,
        resolve: {
          data: PhotosResolver,
        },
    },
    {
        path: 'favorites',
        component: FavoritesComponent,
    },
    {
      path: 'photos/:id',
      component: SinglePhotoInfoComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
];
