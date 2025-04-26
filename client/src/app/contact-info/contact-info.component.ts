import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchResult } from '../Models/SharedDataResult';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})


export class ContactInfoComponent {
  
  http = inject(HttpClient);
  private contactService = inject(ContactService);

  selectedContact: any = {};

  contacts: any;
  result: SearchResult = { contact: null, errorMessage: null };
  contactName: string = '';
  contactTitle: string = '';
  contactCompany: string = '';
  contactEmail: string = '';
  contactPhone: string = '';
  contactAddress: string = '';
 


  ngOnInit(): void {

    this.contactService.result$.subscribe((res) => {
      this.result = res;
      this.contactName = res.contact?.contactName || '';
      this.contactTitle = res.contact?.contactTitle || '';
      this.contactCompany = res.contact?.contactCompany || '';
      this.contactEmail = res.contact?.contactEmail || '';
      this.contactPhone = res.contact?.contactPhone || '';
      this.contactAddress = res.contact?.contactAddress || '';

    });

    this.contactService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });

  }

  // Function to select a contact from the list



}
