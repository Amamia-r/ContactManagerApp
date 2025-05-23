import { Component, inject, OnInit } from '@angular/core';
import { SearchResult } from '../Models/SharedDataResult';
import { ContactService } from '../_services/contact.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, SearchComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})


export class ContactsComponent implements OnInit {


  http = inject(HttpClient);
  private contactService = inject(ContactService);

  loggedIn = false;

  selectedContact: any = {};

  contacts: any;
  result: SearchResult = { contact: null, errorMessage: null };
  contactName: string = '';
  contactTitle: string = '';
  contactCompany: string = '';
  contactEmail: string = '';
  contactPhone: string = '';
  contactAddress: string = '';

  // constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/contact').subscribe(
      {
        next: response => this.contacts = response,
        error: error => console.log(error),
        complete: () => console.log('Request has completed')
      }
    )

    this.contactService.result$.subscribe((res) => {
      this.result = res;
      this.contactName = res.contact?.contactName || '';
      this.contactTitle = res.contact?.contactTitle || '';
      this.contactCompany = res.contact?.contactCompany || '';
      this.contactEmail = res.contact?.contactEmail || '';
      this.contactPhone = res.contact?.contactPhone || '';
      this.contactAddress = res.contact?.contactAddress || '';

    });
  }

  // Function to select a contact from the list
  selectContact(contact: any) {
    this.contactService.selectContact(contact);
  }

  addContact() {
    throw new Error('Method not implemented.');
    }

}
