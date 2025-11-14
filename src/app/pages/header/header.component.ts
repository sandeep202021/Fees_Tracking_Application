import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ RouterOutlet,RouterLink,RouterLinkActive,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  navItems = [
    { label: 'Home', path: 'dashboard' },
    { label: 'Master', path: 'master' },
    { label: 'Package', path: 'packagemaster' },
    { label: 'Institute', path: 'institute' },
    { label: 'Branch', path: 'branch' },
    { label: 'Course', path: 'course' },
    { label: 'Enrollment', path: 'enrollment' },
  ];

  loggedData: any;
  router = inject(Router)

  constructor() {
    const localData = localStorage.getItem("loginUser");
    if (localData != null) {
      this.loggedData = JSON.parse(localData || '{}')?.data?.userName || '';
      // console.log(this.loggedData);
    }
  }

  logoff() {
    localStorage.removeItem("loginUser");
    this.router.navigate(['login'])
  }
}
