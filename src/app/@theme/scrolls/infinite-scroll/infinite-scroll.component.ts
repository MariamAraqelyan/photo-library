import { AfterViewInit, Component, EventEmitter, Inject, input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  loading = input<boolean>(false);
  hasMore = input<boolean>(false);
  @Output() scrolled = new EventEmitter();

  totalElements: number = 0;
  scrollSubscription?: Subscription;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    const options = {
      thresold: 0.9,
    };

    if (isPlatformBrowser(this.platformId)) {
      const mainBody = document.querySelector('.main-body');
      const scrollEvent = fromEvent(mainBody as Element, 'scroll');
      this.scrollSubscription = scrollEvent
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const ch = mainBody!.clientHeight;
          const st = mainBody!.scrollTop;
          const sh = mainBody!.scrollHeight;
          const ratio = (ch + st) / sh;

          if (ratio > options.thresold) {
            this.scrolled.emit();
          }
        })
      )
      .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
}
