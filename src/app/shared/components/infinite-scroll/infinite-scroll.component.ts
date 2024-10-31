import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, input, Input, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() loading!: boolean;
  // loading = input<boolean>(false)
  // hasMore = input<boolean>(false)
  @Input() hasMore!: boolean;
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor!: ElementRef;

  totalElements: number = 0;
  scrollSubscription?: Subscription;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options = {
      thresold: 0.9,
    };

    if (isPlatformBrowser(this.platformId)) {
      const mainBody = document.querySelector('.main-body');
      const scrollEvent = fromEvent(mainBody as Element, 'scroll');
      // debugger
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
    // this.scrollSubscription.unsubscribe();
  }
}
