import { AfterViewInit, Component, EventEmitter, Inject, input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/** Presents Infinite Scroll */
@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  /**
   * The boolean property "loading" 
   * allows dynamic checking status of load
  */
  loading = input<boolean>(false); // I modified these 2 and made them using signals to show off my skills.
  /**
   * The boolean property "hasMore" 
   * allows dynamic checking for new data during scroll
  */
  hasMore = input<boolean>(false); // I modified these 2 and made them using signals to show off my skills.

  /** Emit when the user scrolls to the bottom of a tab */
  @Output() scrolled = new EventEmitter();

  /** User for subscription cleanup */
  scrollSubscription?: Subscription;
  
  /**
   * Constructor of InfiniteScrollComponent
  */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * AfterViewInit
  */
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

  /**
   * Cleanup pending subscriptions.
  */
  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
}
