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
import { LoginUserInput, RegisterUserInput } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private auth = inject(Auth);
	private authUserSignal = signal<User | null>(null);

	getCurrentUser = computed(() => this.authUserSignal());

	constructor() {
		this.auth.onAuthStateChanged((user) => {
			console.log('Auth change', user);
			this.authUserSignal.set(user);
		});
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
