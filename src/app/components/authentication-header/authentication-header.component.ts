import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../auth';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { LoginModalModule } from '../login-modal/login-modal.module';

@Component({
	selector: 'app-authentication-header',
	standalone: true,
	imports: [CommonModule, LoginModalModule, MatDialogModule, MatButtonModule, MatIconModule],
	template: `
		@defer {
			@if (getCurrentUser(); as user) {
				<div class="flex flex-col sm:flex-row gap-2 items-center justify-between">
					<div class="flex items-center gap-2 text-xl">
						<span class="hidden sm:block">Log Is As:</span>
						<span>{{ user?.displayName ?? user.email }}</span>
					</div>

					<button type="button" mat-flat-button class="w-full sm:w-auto" color="warn" (click)="onLogOut()">
						<mat-icon>logout</mat-icon>
						Log Out
					</button>
				</div>
			} @else {
				<div class="flex items-center justify-center">
					<button mat-stroked-button color="primary" (click)="onAuthenticate()" class="min-w-[240px]">
						Authenticate
					</button>
				</div>
			}
		} @placeholder (minimum 1000ms) {
			<div class="text-lg">Checking Authenticated User ...</div>
		}
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationHeaderComponent {
	private dialog = inject(MatDialog);
	private authenticationService = inject(AuthenticationService);

	getCurrentUser = this.authenticationService.getCurrentUser;

	onAuthenticate(): void {
		this.dialog.open(LoginModalComponent, {
			panelClass: ['g-mat-dialog-medium'],
		});
	}

	onLogOut(): void {
		this.authenticationService.signOut();
	}
}
