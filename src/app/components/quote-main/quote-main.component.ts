import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, defer, from, fromEvent, share, startWith, switchMap, tap } from 'rxjs';
import { FirebaseQuotesService, QuotesApiService } from '../../api';
import { AuthenticationService } from '../../auth';

@Component({
	selector: 'app-quote-main',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<section class="flex flex-col gap-2">
			<div class="text-xl md:text-3xl text-yellow-600 text-center w-11/12 md:w-9/12 mx-auto min-h-[180px]">
				{{ (loadedQuote$ | async)?.content }}
			</div>

			<div class="p-3 flex flex-col-reverse sm:flex-row gap-3 justify-between">
				<button
					#likeButton
					mat-stroked-button
					color="accent"
					class="w-full md:w-[240px] h-11 rounded-lg"
					[disabled]="!getCurrentUser()"
				>
					<mat-icon>favorite</mat-icon>
					Like
				</button>

				<button #nextButton mat-stroked-button color="primary" class="w-full md:w-[240px] h-11 rounded-lg">
					<mat-icon>redo</mat-icon>
					Next
				</button>
			</div>
		</section>

		<!-- used async pipe instead of manual subscription -->
		<ng-container *ngIf="likeButtonClick$ | async"></ng-container>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteMainComponent {
	private quotesApiService = inject(QuotesApiService);
	private firebaseQuotesService = inject(FirebaseQuotesService);
	private authenticationService = inject(AuthenticationService);

	getCurrentUser = this.authenticationService.getCurrentUser;

	@ViewChild('nextButton', { static: true, read: ElementRef }) nextButton!: ElementRef<HTMLButtonElement>;
	@ViewChild('likeButton', { static: false, read: ElementRef }) likeButton!: ElementRef<HTMLButtonElement>;

	loadedQuote$ = defer(() =>
		fromEvent(this.nextButton.nativeElement, 'click').pipe(
			startWith(null),
			debounceTime(300),
			switchMap(() => this.quotesApiService.getRandomQuote())
		)
	).pipe(share());

	likeButtonClick$ = this.loadedQuote$.pipe(
		switchMap((quote) =>
			fromEvent(this.likeButton.nativeElement, 'click').pipe(
				switchMap(() =>
					// save to firebase
					from(this.firebaseQuotesService.likeQuote(this.getCurrentUser()!.uid, quote)).pipe(
						// move to next tag
						tap(() => this.nextButton.nativeElement.click())
					)
				)
			)
		)
	);
}
