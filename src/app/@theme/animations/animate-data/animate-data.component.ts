import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Photo } from '../../../core/interfaces/photo.interface';
import { animationList } from 'src/app/@theme/animations/animations';

/**
 * Aplication Animation Component
*/
@Component({
  selector: 'app-animate-data',
  standalone: true,
  imports: [CommonModule],
  animations: [animationList],
  templateUrl: './animate-data.component.html',
  styleUrl: './animate-data.component.scss'
})
export class AnimateDataComponent {
  /** Dynamic data for photo list */
  @Input() library: Photo[] | null = [];
}
