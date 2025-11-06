import { Routes } from '@angular/router';
import { MasterComponent } from './pages/master/master/master.component';
import { LoginComponent } from './pages/feetracking/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { authGuard } from './shared/guard/auth.guard';
import { PackagemasterComponent } from './pages/packagemaster/packagemaster.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InstitutemasterComponent } from './pages/institutemaster/institutemaster.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { InstituteformComponent } from './pages/institutemaster/instituteform/instituteform.component';
import { BranchmasterComponent } from './pages/branchmaster/branchmaster.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: HeaderComponent,
        canActivate: [authGuard],
        children: [
         {path:'dashboard',component:DashboardComponent},
         {path:'master',component:MasterComponent},
         {path:'packagemaster',component:PackagemasterComponent},
         {path:'institute',component:InstitutemasterComponent},
         {path:'instituteForm',component:InstituteformComponent},
         {path:'branch',component:BranchmasterComponent},
         {path:'**',component:ErrorpageComponent}
         
        ]
    }
];
