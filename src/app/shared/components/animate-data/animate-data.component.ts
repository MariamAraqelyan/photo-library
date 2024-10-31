import { Component, Input } from '@angular/core';
import { Photo } from '../../../core/interfaces/photo.interface';

@Component({
  selector: 'app-animate-data',
  standalone: true,
  imports: [],
  templateUrl: './animate-data.component.html',
  styleUrl: './animate-data.component.scss'
})
export class AnimateDataComponent {
  @Input() library: Photo[] = [];
}
