import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { docData as rxDocData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { QuoteData } from '../quotes';
import { FUQuotesUserData, assignTypesClient } from './data.model';

@Injectable({
	providedIn: 'root',
})
export class FirebaseQuotesService {
	private firestore = inject(Firestore);

	getQuotesUser(userId: string): Observable<FUQuotesUserData | undefined> {
		console.log('loading quotes', userId);
		return rxDocData<FUQuotesUserData>(this.getQuotesUserDocRef(userId));
	}

	async likeQuote(userId: string, quote: QuoteData) {
		console.log('save', quote);
		// load user data
		const data = await getDoc(this.getQuotesUserDocRef(userId));
		const existingData = data.data()?.likedQuotes ?? [];

		// check if already liked
		const isLiked = existingData.find((d) => d._id === quote._id);
		if (isLiked) {
			return;
		}

		// update user data
		setDoc(
			this.getQuotesUserDocRef(userId),
			{
				likedQuotes: [quote, ...existingData],
			},
			{ merge: true }
		);
	}

	async removeQuote(userId: string, quoteId: string): Promise<void> {
		// load user data
		const data = await getDoc(this.getQuotesUserDocRef(userId));
		// filter out the quote that is to be removed
		const updatedData = data.data()?.likedQuotes?.filter((quote: QuoteData) => quote._id !== quoteId);
		// update the likedQuotes array
		setDoc(
			this.getQuotesUserDocRef(userId),
			{
				likedQuotes: updatedData,
			},
			{ merge: true }
		);
	}

	private getQuotesUserDocRef(userId: string) {
		return doc(this.firestore, `quotes-user/${userId}`).withConverter(assignTypesClient<FUQuotesUserData>());
	}
}
