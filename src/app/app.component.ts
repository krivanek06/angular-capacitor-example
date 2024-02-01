import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AuthenticationHeaderComponent, QuoteMainComponent } from './components';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MatButtonModule, QuoteMainComponent, AuthenticationHeaderComponent],
	template: `
		<main class="p-4 w-8/12 mx-auto">
			<app-authentication-header />

			<div class="mt-10">
				<app-quote-main></app-quote-main>
			</div>
		</main>
	`,
	styles: [],
})
export class AppComponent {}
