import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarCondPage } from './registrar-cond.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarCondPageRoutingModule {}
