import { Component, inject, Inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { SearchComponent } from "../search/search.component";
import { ContactsComponent } from "../contacts/contacts.component";
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NavComponent, SearchComponent, ContactsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  accountService = inject(AccountService);

  users: any = {};

  ngOnInit(): void {
    this.setCurrentUsers();
  }

  setCurrentUsers() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}

