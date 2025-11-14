import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // Get logged in user from localStorage
  getLoggedInUser(): any {
    try {
      const userData = localStorage.getItem('InstituteData');
      if (userData) {
        const parsed = JSON.parse(userData);
         return parsed.instituteId || null; 
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  
}