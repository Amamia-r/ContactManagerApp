import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
