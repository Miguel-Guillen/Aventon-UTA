import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPasaPage } from './menu-pasa.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPasaPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pasajero/pasajero.module').then( m => m.PasajeroPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPasaPageRoutingModule {}
