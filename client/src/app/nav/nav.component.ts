import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact, ContactService } from '../_services/contact.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  private toastr = inject(ToastrService);

  contact: Contact | null = null;
  errorMessage: string | null = null;

  // Initialize model properly
  model = { contactname: '' };
  loading = false;

  constructor(private contactService: ContactService) { }

  searchContact(name: string): void {
    this.loading = true;

    this.contactService.searchContactByName(name).subscribe({
      next: (result) => {
        this.contact = result;
        this.errorMessage = null;
        this.loading = false;

        //  Push to shared service so other components can react
        this.contactService.setSearchResult({
          contact: result,
          errorMessage: null
        });
      },
      error: () => {
        this.contact = null;
        this.errorMessage = 'Contact not found.';
        this.loading = false;

        //  Push error to shared service
        this.contactService.setSearchResult({
          contact: null,
          errorMessage: 'Contact not found.'
        });
      }
    });

  }


  // sharing data




}
