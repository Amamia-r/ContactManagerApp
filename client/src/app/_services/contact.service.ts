import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../Models/SharedDataResult';

export interface Contact {
  id: number;
  contactName: string;
  contactTitle: string;
  contactCompany: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

}

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl = 'https://localhost:5001/api/contact';

  constructor(private https: HttpClient) { }

  //  Search service
  searchContactByName(name: string): Observable<Contact> {
    const params = new HttpParams().set('name', name);
    return this.https.get<Contact>(`${this.apiUrl}/search`, { params });
  }

  private resultSource = new BehaviorSubject<SearchResult>({ contact: null, errorMessage: null });
  result$ = this.resultSource.asObservable();

  setSearchResult(result: SearchResult) {
    this.resultSource.next(result);
  }

  //  select service
  private selectedContactSource = new BehaviorSubject<SearchResult>({ contact: null, errorMessage: null });
  selectedContact$ = this.selectedContactSource.asObservable();

  selectContact(contact: any) {
    this.selectedContactSource.next(contact);
  }

}

