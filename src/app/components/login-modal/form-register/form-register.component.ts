import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { RegisterUserInput } from '../../../auth';

@Component({
	selector: 'app-form-register',
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
					Max length is 50
				</mat-error>
				<mat-error *ngIf="formGroup.controls.email.touched && formGroup.controls.email.hasError('email')">
					Value must be email
				</mat-error>
			</mat-form-field>

			<!-- password1 -->
			<mat-form-field>
				<mat-label>Password</mat-label>
				<input matInput formControlName="password1" placeholder="Enter Email" type="password" />
				<mat-error *ngIf="formGroup.controls.password1.touched && formGroup.controls.password1.hasError('required')">
					Password is required
				</mat-error>
				<mat-error *ngIf="formGroup.controls.password1.touched && formGroup.controls.password1.hasError('maxlength')">
					Max length is 25
				</mat-error>
				<mat-error *ngIf="formGroup.controls.password1.touched && formGroup.controls.password1.hasError('minlength')">
					Min length is 4
				</mat-error>
			</mat-form-field>

			<!-- password2 -->
			<mat-form-field>
				<mat-label>Password Repeat</mat-label>
				<input matInput formControlName="password2" placeholder="Enter Email" type="password" />
				<mat-error *ngIf="formGroup.controls.password2.touched && formGroup.controls.password2.hasError('required')">
					Password is required
				</mat-error>
				<mat-error *ngIf="formGroup.controls.password2.touched && formGroup.controls.password2.hasError('maxlength')">
					Max length is 25
				</mat-error>
				<mat-error *ngIf="formGroup.controls.password2.touched && formGroup.controls.password2.hasError('minlength')">
					Min length is 4
				</mat-error>
			</mat-form-field>

			<!-- submit -->
			<button mat-stroked-button class="w-full text-wt-success-medium" type="submit">Register</button>
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
			useExisting: forwardRef(() => FormRegisterComponent),
			multi: true,
		},
	],
})
export class FormRegisterComponent implements ControlValueAccessor {
	formGroup = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.email, Validators.required, Validators.maxLength(50)],
			nonNullable: true,
		}),
		password1: new FormControl('', {
			validators: [Validators.required, Validators.maxLength(25), Validators.minLength(4)],
			nonNullable: true,
		}),
		password2: new FormControl('', {
			validators: [Validators.required, Validators.maxLength(25), Validators.minLength(4)],
			nonNullable: true,
		}),
	});

	onChange: (value: RegisterUserInput) => void = () => {};
	onTouched = () => {};

	onSubmit(): void {
		if (this.formGroup.invalid) {
			return;
		}
		const controls = this.formGroup.controls;

		// passwords don't match
		if (controls.password1.value !== controls.password2.value) {
			controls.password1.patchValue('');
			controls.password2.patchValue('');
			controls.password1.updateValueAndValidity();
			controls.password2.updateValueAndValidity();
			return;
		}

		const result: RegisterUserInput = {
			email: controls.email.value,
			password: controls.password1.value,
			passwordRepeat: controls.password2.value,
		};

		this.onChange(result);
	}

	writeValue(obj: RegisterUserInput | undefined): void {
		if (obj) {
			this.formGroup.patchValue(obj);
		}
	}

	/**
	 * Register Component's ControlValueAccessor onChange callback
	 */
	registerOnChange(fn: FormRegisterComponent['onChange']): void {
		this.onChange = fn;
	}

	/**
	 * Register Component's ControlValueAccessor onTouched callback
	 */
	registerOnTouched(fn: FormRegisterComponent['onTouched']): void {
		this.onTouched = fn;
	}
}
