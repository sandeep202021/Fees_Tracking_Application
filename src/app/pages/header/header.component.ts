import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ RouterOutlet,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  loggedData: any;
  router = inject(Router)

  constructor() {
    const localData = localStorage.getItem("loginUser");
    if (localData != null) {
      this.loggedData = JSON.parse(localData || '{}')?.data?.userName || '';
      console.log(this.loggedData);
    }
  }

  logoff() {
    localStorage.removeItem("loginUser");
    this.router.navigate(['login'])
  }
}
