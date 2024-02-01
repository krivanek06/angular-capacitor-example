import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { LoginUserInput } from '../../../auth';

@Component({
	selector: 'app-form-login',
	template: `
		<form [formGroup]="formGroup" class="flex flex-col gap-6" (ngSubmit)="onSubmit()">
			<!-- email -->
			<mat-form-field>
				<mat-label>Email</mat-label>
				<input matInput formControlName="email" placeholder="Enter Email" type="email" />
				<mat-error *ngIf="formGroup.controls.email.touched && formGroup.controls.email.hasError('required')">
					Email is required
				</mat-error>
				<mat-error *ngIf="formGroup.controls.email.touched && formGroup.controls.email.hasError('maxlength')">
					Max length is 40
				</mat-error>
				<mat-error *ngIf="formGroup.controls.email.touched && formGroup.controls.email.hasError('email')">
					Value must be email
				</mat-error>
			</mat-form-field>

			<!-- password1 -->
			<mat-form-field>
				<mat-label>Password</mat-label>
				<input matInput formControlName="password" placeholder="Enter Email" type="password" />
				<mat-error *ngIf="formGroup.controls.password.touched && formGroup.controls.password.hasError('required')">
					Password is required
				</mat-error>
			</mat-form-field>

			<!-- submit -->
			<button mat-stroked-button color="primary" class="w-full" type="submit">Login</button>
		</form>
	`,
	styles: [
		`
			:host {
				display: block;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormLoginComponent),
			multi: true,
		},
	],
})
export class FormLoginComponent {
	formGroup = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.email, Validators.required, Validators.maxLength(50)],
			nonNullable: true,
		}),
		password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
	});

	onChange: (value: LoginUserInput) => void = () => {};
	onTouched = () => {};

	onSubmit(): void {
		this.formGroup.markAllAsTouched();

		if (this.formGroup.invalid) {
			return;
		}

		const result: LoginUserInput = {
			email: this.formGroup.controls.email.value,
			password: this.formGroup.controls.password.value,
		};

		this.onChange(result);
	}

	writeValue(obj: LoginUserInput | undefined): void {
		if (obj) {
			this.formGroup.setValue({
				email: obj.email,
				password: obj.password,
			});
		}
	}

	/**
	 * Register Component's ControlValueAccessor onChange callback
	 */
	registerOnChange(fn: FormLoginComponent['onChange']): void {
		this.onChange = fn;
	}

	/**
	 * Register Component's ControlValueAccessor onTouched callback
	 */
	registerOnTouched(fn: FormLoginComponent['onTouched']): void {
		this.onTouched = fn;
	}
}
