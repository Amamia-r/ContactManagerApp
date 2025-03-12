import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { SearchResult } from './Models/SharedDataResult';
import { ContactService } from './_services/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  selectedContact: any = {};

  http = inject(HttpClient);
  contacts: any;
  result: SearchResult = { contact: null, errorMessage: null };
  contactName: string = '';
  contactEmail: string = '';
  contactPhone: string = '';
  contactAddress: string = '';

  constructor(private contactService: ContactService) { }

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
      this.contactEmail = res.contact?.contactEmail || '';
      this.contactPhone = res.contact?.contactPhone || '';
      this.contactAddress = res.contact?.contactAddress || '';

    });
  }
  // Function to select a contact from the list
  selectContact(contact: any) {
    this.selectedContact = { ...contact }; // The selected contact
  }



}
