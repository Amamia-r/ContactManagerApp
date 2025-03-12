import { Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';

export const routes: Routes = [
    { path: 'errors', component: TestErrorsComponent },
    { path: 'error/not-found', component: TestErrorsComponent },
    { path: 'error/server-error', component: TestErrorsComponent },
    { path: 'error/bad-request', component: TestErrorsComponent }
  

];
