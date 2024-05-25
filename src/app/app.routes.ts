import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/front-office/login-register/login-register.component';
import { HomeComponent } from './components/front-office/home/home/home.component';
import { ContactComponent } from './components/front-office/contact/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'contato', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
