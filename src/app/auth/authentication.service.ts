import { Injectable, computed, signal } from '@angular/core';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { LoginUserInput, RegisterUserInput } from './authentication.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private authUserSignal = signal<User | null>(null);
	getCurrentUser = computed(() => this.authUserSignal());

	constructor() {
		FirebaseAuthentication.addListener('authStateChange', (change) => {
			console.log('Auth state change', change);
			this.authUserSignal.set(change.user);
		});
	}

	async signIn(input: LoginUserInput): Promise<void> {
		await FirebaseAuthentication.signInWithEmailAndPassword({
			email: input.email,
			password: input.password,
		});
	}

	async register(input: RegisterUserInput): Promise<void> {
		await FirebaseAuthentication.createUserWithEmailAndPassword({
			email: input.email,
			password: input.password,
		});
	}

	async removeAccount(): Promise<void> {
		const user = await FirebaseAuthentication.getCurrentUser();
		if (user) {
			FirebaseAuthentication.deleteUser();
		}
	}

	async signInGoogle(): Promise<void> {
		const result = await FirebaseAuthentication.signInWithGoogle();
		console.log('result', result);
	}

	async signOut(): Promise<void> {
		await FirebaseAuthentication.signOut();
	}

	async changePassword(oldPassword: string, newPassword: string): Promise<void> {
		const currentUser = this.getCurrentUser();

		if (!currentUser?.email) {
			throw new Error('User is not authenticated');
		}

		try {
			await FirebaseAuthentication.updatePassword({
				newPassword: newPassword,
			});
		} catch (error) {
			console.error(error);
			throw new Error('Old password is incorrect');
		}
	}
}
