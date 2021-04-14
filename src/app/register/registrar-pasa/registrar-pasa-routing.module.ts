import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPasaPage } from './registrar-pasa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPasaPageRoutingModule {}
