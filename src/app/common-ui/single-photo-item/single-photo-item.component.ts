import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { Photo } from '@interfaces/photo.interface';
import { CONFIG } from '@config';

@Component({
  selector: 'app-single-photo-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './single-photo-item.component.html',
  styleUrl: './single-photo-item.component.scss'
})
export class SinglePhotoItemComponent {
  @Input('photo') photo!: Photo;
  @Input('size') size!: number;
  @Output() addFavorite = new EventEmitter<Photo>();

  photoUrl: string = '';

  ngOnInit(): void {
    const size = this.size || 250;
    if (!this.photo) return;
    this.photoUrl = `${CONFIG.singlePhotoUrl}/${this.photo.id}/${size}/${size}.jpg`;
  }

  addToFavorite(photo: Photo) {
    this.addFavorite.emit(photo);
  }
}
