import { Routes } from '@angular/router';
import { MasterComponent } from './pages/master/master/master.component';
import { LoginComponent } from './pages/feetracking/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: HeaderComponent,
        canActivate: [authGuard],
        children: [
         {path:'master',component:MasterComponent}
        ]
    }
];
