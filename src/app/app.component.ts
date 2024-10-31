import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // constructor(private photoStore: PhotosStoreService) {}

  // ngOnInit(): void {
  //   this.checkForStorage();
  // }

  // checkForStorage() {
  //   const favorites = JSON.parse(localStorage.getItem('favorites') as string);
  //   if (favorites.length) this.photoStore.setState(favorites as Photo[]);
  // }
}
