import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { LoginModalComponent } from './login-modal.component';
@NgModule({
	declarations: [LoginModalComponent, FormRegisterComponent, FormLoginComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDividerModule,
		MatTabsModule,
		MatProgressSpinnerModule,
		MatInputModule,
		MatFormFieldModule,
	],
	exports: [LoginModalComponent],
})
export class LoginModalModule {}
