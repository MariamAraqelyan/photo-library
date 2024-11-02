import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardActions, MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { Photo } from '@interfaces/photo.interface';
import { CONFIG } from '@config';

/** Presents Single Photo Item */
@Component({
  selector: 'app-single-photo-item',
  standalone: true,
  imports: [MatCardModule, MatCardActions, MatButtonModule],
  templateUrl: './single-photo-item.component.html',
  styleUrl: './single-photo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePhotoItemComponent {
  /** Dynamic data for one photo item */
  @Input('photo') photo!: Photo;

  /** Dynamic size for one photo */
  @Input('size') size!: number;
  
  /**
   * Emit when the user clicks the "Add to Favorites" button
  */
  @Output() addFavorite = new EventEmitter<Photo>();

  /**
   * Current Photo Url
  */
  photoUrl: string = '';

  /**
   * Initialize
  */
  ngOnInit(): void {
    const size = this.size || 250;
    if (!this.photo) return;
    this.photoUrl = `${CONFIG.singlePhotoUrl}/${this.photo.id}/${size}/${size}.jpg`;
  }

  /**
   * React when the "OpenPhoto" button is clicked
   * 
   * @param photo Selected photo data
  */
  addToFavorite(photo: Photo) {
    this.addFavorite.emit(photo);
  }
}
