import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact, ContactService } from '../_services/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
    private toastr = inject(ToastrService);
  
    contact: Contact | null = null;
    errorMessage: string | null = null;
  
    // Initialize model properly
    model = { contactname: '' };

  
    constructor(private contactService: ContactService) { }
  
    searchContact(name: string): void {

  
      this.contactService.searchContactByName(name).subscribe({
        next: (result) => {
          this.contact = result;
          this.errorMessage = null;

  
          //  Push to shared service so other components can react
          this.contactService.setSearchResult({
            contact: result,
            errorMessage: null
          });
        },
        error: () => {
          this.contact = null;
          this.errorMessage = 'Contact not found.';
 
  
          //  Push error to shared service
          this.contactService.setSearchResult({
            contact: null,
            errorMessage: 'Contact not found.'
          });
        }
      });
  
    }
  

}
