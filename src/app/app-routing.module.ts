import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginConductorGuard } from './guards/login-conductor.guard';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { LoginPasaGuard } from './guards/login-pasa.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu-admin/menu.module').then( m => m.MenuPageModule),
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'menu-pasa',
    loadChildren: () => import('./menu/menu-pasa/menu-pasa.module').then( m => m.MenuPasaPageModule),
    canActivate: [LoginPasaGuard]
  },
  {
    path: 'menu-conductor',
    loadChildren: () => import('./menu/menu-cond/menu-cond.module').then( m => m.MenuCondPageModule),
    canActivate: [LoginConductorGuard]
  },
  {
    path: 'registrar-pasa',
    loadChildren: () => import('./register/registrar-pasa/registrar-pasa.module').then( m => m.RegistrarPasaPageModule)
  },
  {
    path: 'registrar-cond',
    loadChildren: () => import('./register/registrar-cond/registrar-cond.module').then( m => m.RegistrarCondPageModule)
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./login/login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  },
  {
    path: 'login-pasa',
    loadChildren: () => import('./login/login-pasa/login-pasa.module').then( m => m.LoginPasaPageModule)
  },
  {
    path: 'login-conductor',
    loadChildren: () => import('./login/login-conductor/login-conductor.module').then( m => m.LoginConductorPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
