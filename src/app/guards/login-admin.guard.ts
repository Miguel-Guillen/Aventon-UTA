import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {

  constructor(private route: Router) { 
  }

  async canActivate(){ 
    const sesionIniciada = await localStorage.getItem("sesionIniciada");
    if (sesionIniciada){
      return true;
    } else {
      this.route.navigateByUrl("/login-admin")
    }
  }
  
}
