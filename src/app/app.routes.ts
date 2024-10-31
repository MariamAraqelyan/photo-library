import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PhotosResolver } from './core/resolvers/photos-data.resolver';

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
      path: '**',
      component: PageNotFoundComponent,
    },
];
