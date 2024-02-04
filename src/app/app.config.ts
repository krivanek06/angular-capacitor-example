import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(),
		provideRouter([]),
		importProvidersFrom([
			provideFirebaseApp(() =>
				initializeApp({
					projectId: 'angular-capacitor-example',
					appId: '1:735796592806:web:4215646e290a7eee5eb467',
					storageBucket: 'angular-capacitor-example.appspot.com',
					apiKey: 'AIzaSyA4ZzZ6DaA-UY0ow9jzkg7n_omFPFjouJ0',
					authDomain: 'angular-capacitor-example.firebaseapp.com',
					messagingSenderId: '735796592806',
				})
			),
			provideAuth(() => getAuth()),
			provideFirestore(() => getFirestore()),
		]),
		provideAnimations(),
	],
};
