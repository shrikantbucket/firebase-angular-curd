import { CanActivateFn,Route, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("Roter Run",state);

  if(localStorage.getItem('token') == 'true'){
    return true;
  }
  
  return false;
};
