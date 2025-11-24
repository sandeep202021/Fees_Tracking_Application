import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MasterServiceService } from '../../core/services/master/master-service.service';

@Component({
  selector: 'app-header',
  imports: [ RouterOutlet,RouterLink,RouterLinkActive,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    allNavItems = [
    { label: 'Home', path: 'dashboard', roles: ['SuperAdmin', 'InstituteAdmin'] },
    { label: 'Master', path: 'master', roles: ['SuperAdmin'] },
    { label: 'Package', path: 'packagemaster', roles: ['SuperAdmin'] },
    { label: 'Institute', path: 'institute', roles: ['SuperAdmin'] },
    { label: 'Branch', path: 'branch', roles: ['InstituteAdmin'] },
    { label: 'Course', path: 'course', roles: ['InstituteAdmin'] },
    { label: 'Enrollment', path: 'enrollment', roles: ['InstituteAdmin'] },
    { label: 'Payment', path: 'payment', roles: ['InstituteAdmin'] },
    { label: 'Student', path: 'student', roles: ['InstituteAdmin'] },
  ];

  navItems: any[] = [];
  loggedData: any;
  router = inject(Router);
  mastrServ=inject(MasterServiceService);
  loggeduserData:any;

  constructor() {
    const localData = localStorage.getItem("loginUser");
    
    if (localData != null) {
      //this.loggedData = JSON.parse(localData || '{}')?.data?.userName || '';
      const parsed = JSON.parse(localData);

      this.loggedData = parsed?.data?.userName || '';
      this.loggeduserData = parsed?.data?.role || '';

      this.filterNavItemsByRole();
      console.log("This role === ",this.loggeduserData);
      
      // console.log(this.loggedData);
    }
  }

  filterNavItemsByRole() {
    if (this.loggeduserData) {
      this.navItems = this.allNavItems.filter(item => 
        item.roles.includes(this.loggeduserData)
      );
    } else {
      // If no role is found, show no navigation items
      this.navItems = [];
    }
  }

  logoff() {
    localStorage.removeItem("loginUser");
    this.router.navigate(['login'])
  }
}
