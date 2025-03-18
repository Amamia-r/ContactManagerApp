import { Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: 'errors', component: TestErrorsComponent },
    { path: 'error/not-found', component: TestErrorsComponent },
    { path: 'error/server-error', component: TestErrorsComponent },
    { path: 'error/bad-request', component: TestErrorsComponent },

    { path: '', component: LoginComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: LoginComponent, pathMatch: 'full' }


];
