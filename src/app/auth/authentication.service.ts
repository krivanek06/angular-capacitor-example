import { Injectable, computed, inject, signal } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { LoginUserInput, RegisterUserInput } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private auth = inject(Auth);
	private authUserSignal = signal<User | null>(null);
	private loadedAuthentication$ = new Subject<User['uid'] | null>();

	isUserNew = computed(
		() => this.authUserSignal()?.metadata?.creationTime == this.authUserSignal()?.metadata?.lastSignInTime
	);
	getCurrentUser = computed(() => this.authUserSignal());
	getCurrentUserMust = computed(() => this.authUserSignal()!);

	constructor() {
		this.auth.onAuthStateChanged((user) => {
			console.log('Auth change', user);
			this.authUserSignal.set(user);
			this.loadedAuthentication$.next(user?.uid ?? null);
		});
	}

	getLoadedAuthentication(): Observable<User['uid'] | null> {
		return this.loadedAuthentication$.asObservable();
	}

	signIn(input: LoginUserInput): Promise<UserCredential> {
		return signInWithEmailAndPassword(this.auth, input.email, input.password);
	}

	register(input: RegisterUserInput): Promise<UserCredential> {
		return createUserWithEmailAndPassword(this.auth, input.email, input.password);
	}

	removeAccount(): void {
		if (this.auth.currentUser) {
			this.auth.currentUser.delete();
		}
	}

	signInGoogle(): Promise<UserCredential> {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(this.auth, provider);
	}

	signOut() {
		this.auth.signOut();
	}
}
