import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const islocalPresent=localStorage.getItem("loginUser");
  if(islocalPresent != null) {
    return true;
  } else {
    router.navigateByUrl('login')
    return false;
  }
};
