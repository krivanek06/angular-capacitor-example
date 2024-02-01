import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, of, switchMap } from 'rxjs';
import { FirebaseQuotesService, QuoteData } from '../../api';
import { AuthenticationService } from '../../auth';

@Component({
	selector: 'app-quote-saved',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		@for (item of loadedQuotesSignal(); track item._id) {
			<aside class="flex flex-row gap-3 border border-solid border-gray-400 rounded-lg p-4 mb-4">
				<div class="text-xl md:text-2xl text-cyan-800 text-start w-11/12 md:w-9/12 mx-auto ">
					{{ item.content }}
				</div>

				<div>
					<button mat-icon-button color="warn" (click)="onDelete(item)">
						<mat-icon>delete</mat-icon>
					</button>
				</div>
			</aside>
		}
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSavedComponent {
	private firebaseQuotesService = inject(FirebaseQuotesService);
	private authenticationService = inject(AuthenticationService);

	getCurrentUser = this.authenticationService.getCurrentUser;

	loadedQuotesSignal = toSignal(
		toObservable(this.authenticationService.getCurrentUser).pipe(
			switchMap((user) =>
				!user ? of([]) : this.firebaseQuotesService.getQuotesUser(user.uid).pipe(map((data) => data?.likedQuotes ?? []))
			)
		),
		{ initialValue: [] }
	);

	onDelete(item: QuoteData): void {
		const user = this.getCurrentUser();
		if (user) {
			this.firebaseQuotesService.removeQuote(user.uid, item._id);
		}
	}
}
