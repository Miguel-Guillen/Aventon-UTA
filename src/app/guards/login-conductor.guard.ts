import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginConductorGuard implements CanActivate {

  constructor(private route: Router) {}

  async canActivate(){ 
    const sesionIniciada = await localStorage.getItem("sesionIniciada_C");
    if (sesionIniciada){
      return true;
    } else {
      this.route.navigateByUrl("/login-conductor")
    }
  }
  
}
