import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, catchError, filter, from, switchMap, take, tap } from 'rxjs';
import {
	AuthenticationService,
	LoginUserInput,
	RegisterUserInput,
	TEST_USER_EMAIL,
	TEST_USER_PASSWORD,
} from '../../auth';

@Component({
	selector: 'app-login-modal',
	template: `
		<div class="flex items-center justify-between p-4">
			<h2 class="text-xl text-wt-primary-dark mb-0">Authentication</h2>

			<div>
				<button mat-icon-button color="warn" type="button" mat-dialog-close>
					<mat-icon>close</mat-icon>
				</button>
			</div>
		</div>

		<!-- content -->
		<mat-dialog-content>
			<mat-tab-group>
				<mat-tab label="Login">
					<app-form-login [formControl]="loginUserInputControl"></app-form-login>

					<div class="my-4">
						<mat-divider></mat-divider>
					</div>

					<!-- social media login -->
					<h2 class="text-lg text-wt-primary-dark">Social Media Login</h2>
					<mat-dialog-actions>
						<button
							mat-flat-button
							(click)="onGoogleAuth()"
							color="warn"
							type="button"
							class="w-full text-center rounded-lg"
						>
							Google
						</button>
					</mat-dialog-actions>

					<div class="my-4">
						<mat-divider></mat-divider>
					</div>

					<!-- development -->
					<h2 class="text-lg text-wt-primary-dark">Demo Account Login</h2>
					<button mat-stroked-button color="accent" class="w-full" type="button" (click)="onDemoLogin()">
						Demo Login
					</button>
				</mat-tab>
				<mat-tab label="Register">
					<app-form-register [formControl]="registerUserInputControl"></app-form-register>
				</mat-tab>
			</mat-tab-group>
		</mat-dialog-content>
	`,
	styles: [
		`
			:host {
				display: block;
			}

			::ng-deep .mat-mdc-tab-body-wrapper {
				@apply max-sm:mt-[20px];
			}

			::ng-deep mat-dialog-container {
				@screen md {
					min-height: 670px !important;
				}
			}

			::ng-deep .mat-mdc-tab-header {
				margin-bottom: 24px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
	loginUserInputControl = new FormControl<LoginUserInput | null>(null);
	registerUserInputControl = new FormControl<RegisterUserInput | null>(null);

	constructor(
		private authenticationFacadeService: AuthenticationService,
		private dialogRef: MatDialogRef<LoginModalComponent>
	) {
		this.watchLoginUserFormControl();
		this.watchRegisterUserFormControl();
	}

	async onGoogleAuth() {
		from(this.authenticationFacadeService.signInGoogle())
			.pipe(
				tap(() => this.dialogRef.close()),
				take(1),
				catchError((err) => {
					console.log(err);
					return EMPTY;
				})
			)
			.subscribe((e) => console.log('google', e));
	}

	/**
	 * try to login with demo account or create one
	 */
	async onDemoLogin() {
		try {
			await this.authenticationFacadeService.signIn({
				email: TEST_USER_EMAIL,
				password: TEST_USER_PASSWORD,
			});
			// close dialog
			this.dialogRef.close();
		} catch (err) {
			console.log(err);
		}
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	private watchLoginUserFormControl(): void {
		this.loginUserInputControl.valueChanges
			.pipe(
				filter((res): res is LoginUserInput => !!res),
				switchMap((res) =>
					from(this.authenticationFacadeService.signIn(res)).pipe(
						tap(() => this.dialogRef.close()),
						catchError((err) => {
							console.log(err);
							return EMPTY;
						})
					)
				),
				takeUntilDestroyed()
			)
			.subscribe();
	}

	private watchRegisterUserFormControl(): void {
		this.registerUserInputControl.valueChanges
			.pipe(
				filter((res): res is RegisterUserInput => !!res),
				switchMap((res) =>
					from(this.authenticationFacadeService.register(res)).pipe(
						tap(() => this.dialogRef.close()),
						catchError((err) => {
							console.log(err);
							return EMPTY;
						})
					)
				),
				takeUntilDestroyed()
			)
			.subscribe();
	}
}
