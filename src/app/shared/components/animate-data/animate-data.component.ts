import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Photo } from '../../../core/interfaces/photo.interface';
import { animationList } from '../../../@theme/animations';

@Component({
  selector: 'app-animate-data',
  standalone: true,
  imports: [CommonModule],
  animations: [animationList],
  templateUrl: './animate-data.component.html',
  styleUrl: './animate-data.component.scss'
})
export class AnimateDataComponent {
  @Input() library: Photo[] | null = [];
}
