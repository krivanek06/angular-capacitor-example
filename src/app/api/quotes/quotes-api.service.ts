import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QuoteData } from './quotes-api.model';

/**
 * API link - https://github.com/lukePeavey/quotable
 */
@Injectable({
	providedIn: 'root',
})
export class QuotesApiService {
	private url = 'https://api.quotable.io';
	private http = inject(HttpClient);

	getRandomQuote(): Observable<QuoteData> {
		return this.http.get<QuoteData[]>(`${this.url}/quotes/random`).pipe(map((response) => response[0]));
	}
}
