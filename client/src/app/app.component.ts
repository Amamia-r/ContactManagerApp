import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { MenuComponent } from "./menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FormsModule, TestErrorsComponent, MenuComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
