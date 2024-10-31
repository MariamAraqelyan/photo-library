import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    {
        path: '',
        component: GalleryComponent,
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
