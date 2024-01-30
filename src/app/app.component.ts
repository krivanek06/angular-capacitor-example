import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  template: `
    <div>
      <button mat-flat-button color="primary">This is button</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
