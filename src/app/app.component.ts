import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AuthenticationHeaderComponent, QuoteMainComponent, QuoteSavedComponent } from './components';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MatButtonModule, QuoteMainComponent, AuthenticationHeaderComponent, QuoteSavedComponent],
	template: `
		<main class="p-4 w-full md:w-10/12 lg:w-8/12 mx-auto">
			<app-authentication-header />

			<div class="my-10">
				<app-quote-main />
			</div>

			<app-quote-saved />
		</main>
	`,
	styles: [],
})
export class AppComponent {}
