import { Contact } from "../_services/contact.service";

export interface SearchResult {
    contact: Contact | null;
    errorMessage: string | null;
}
